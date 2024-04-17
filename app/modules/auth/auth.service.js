const utils = require("../../others/utils")
const requestUtils = require('../../others/requestUtils')
const constant = require("../../others/constant")
const userModel = require("../user/user.model");
const { signUpErrors } = require("./components/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

function generateUsername(email, phoneNumber) {
  const emailParts = email.split('@');
  const username = emailParts[0];
  const phoneLastDigits = phoneNumber.slice(-4);
  const generatedUsername = `${username}${phoneLastDigits}`;
  return generatedUsername;
}


module.exports.register = async (data) => {
  try {
    console.log(data)
    const { number, email, password, role } = data;
    if ((!number || !email) && !password && !role) {
      return utils.responseConstructor(utils.STATUS_CODE.NOT_DATA, null, "identifiants");
    }

    if (password.length < 8) {
      return utils.responseConstructor(utils.STATUS_CODE.DATA_INCORRECT, null, "mot de passe court");
    }

    const _role = constant.USER_ROLE[role]
    console.log("_role", _role)
    if (!_role) {
      return utils.responseConstructor(utils.STATUS_CODE.DATA_INCORRECT, null, "role incorect. utiliser " + Object.values(constant.USER_ROLE).toString());
    }

    //crypt password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);


    const user = await userModel.create({
      number,
      email,
      password: hashPassword,
      role,
      username: generateUsername(email, number)
    });
    return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, user);
  } catch (err) {
    console.log("auth.service.register=>", err);
    const errors = signUpErrors(err);
    return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, errors)
  }
};

module.exports.login = async (data) => {
  try {
    const { password, method } = data;
    if (!password || !method)
      return utils.responseConstructor(utils.STATUS_CODE.NOT_DATA, null, "identifiants");
    const user = await userModel.findOne({
      $or: [
        {
          email: method,
        },
        {
          number: method,
        },
      ],
    })

    if (user) {
      const auth = await bcrypt.compare(password, user.password);

      if (!auth) {
        return utils.responseConstructor(utils.STATUS_CODE.NOT_DATA, null, "identifiants");
      }
    } else {
      return utils.responseConstructor(utils.STATUS_CODE.NOT_DATA, null, "identifiants");
    }
    const token = createToken(user._id);
    const d = { user, token }
    return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, d);
  } catch (err) {
    console.log("auth.service.login=>", err);
    return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, err)
  }
};
