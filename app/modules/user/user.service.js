const utils = require("../../others/utils");
const userModel = require("./user.model");

module.exports.getById = async (id) => {
    try {
        const user = await userModel
            .findById(id)
            .select({ password: false });
        if (!user) {
            return utils.responseConstructor(utils.STATUS_CODE.NOT_FOUND, null, "utilisateur");
        }
        return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, user);
    } catch (err) {
        console.log("user.service.getById=>", err);
        return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, err)
    }
}

module.exports.getAllUser = async () => {
    try {
        const users = await userModel
            .find()
            .select({ password: false });
        return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, users);
    } catch (err) {
        console.log("user.service.getAllUser=>", err);
        return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, err)
    }
};

module.exports.updateUser = async (data, id) => {
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return utils.responseConstructor(utils.STATUS_CODE.NOT_FOUND, null, "utilisateur");
        }
        const updateObject = utils.setUpdateObject(user, data);
        const userUpdated = await updateObject.save();
        return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, userUpdated);
    } catch (err) {
        console.log("user.service.updateUser=>", err);
        return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, err)
    }
};

module.exports.remove = async (id) => {
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return utils.responseConstructor(utils.STATUS_CODE.NOT_FOUND, null, "utilisateur");
        }
        await userModel.deleteOne({_id:id});
        return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, 'ok');
    } catch (err) {
        console.log("user.service.remove=>", err);
        return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, err)
    }
};