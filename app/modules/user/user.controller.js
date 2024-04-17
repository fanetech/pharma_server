const requestUtils = require('../../others/requestUtils')
const userService = require("./user.service")

module.exports.getById = async (req, res) => {
  const response = await userService.getById(req.params.id);
  return requestUtils.globalSatuts(res, response);
};

module.exports.getAllUser = async (req, res) => {
  const response = await userService.getAllUser();
  return requestUtils.globalSatuts(res, response);
};

module.exports.update = async (req, res) => {
  const response = await userService.updateUser(req.body, req.params.id);
  return requestUtils.globalSatuts(res, response);
};

module.exports.remove = async (req, res) => {
  const response = await userService.remove(req.params.id);
  return requestUtils.globalSatuts(res, response);
};