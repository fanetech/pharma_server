const utils = require("../../others/utils");
const userModel = require("../user/user.model");
const pharmacyModel = require("./pharmacy.model");

module.exports.create = async (data) => {
    try {
      const { name, latitude, longitude, owner } = data;
      if ((!name || !latitude) && !longitude && !owner) {
        return utils.responseConstructor(utils.STATUS_CODE.DATA_REQUIS, null, "identifiants");
      }
      const user = await userModel.findById(owner);
      if (!user) {
        return utils.responseConstructor(utils.STATUS_CODE.NOT_FOUND, null, "utilisateur");
      }
  
      const pharmacy = await pharmacyModel.create(data);
      return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, pharmacy);
    } catch (err) {
      console.log("phamacy.service.create=>", err);
      return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, errors)
    }
  };

  module.exports.getById = async (id) => {
    try {
        const pharmacy = await pharmacyModel
            .findById(id).populate("owner").select({owner:{ password: false }});
        if (!pharmacy) {
            return utils.responseConstructor(utils.STATUS_CODE.NOT_FOUND, null, "pharmacie");
        }
        return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, pharmacy);
    } catch (err) {
        console.log("phamacy.service.getById=>", err);
        return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, err)
    }
}

module.exports.getAll = async () => {
    try {
        const pharmacys = await pharmacyModel
            .find().populate("owner").select({owner:{ password: false }});
        return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, pharmacys);
    } catch (err) {
        console.log("pharmacy.service.getAllUser=>", err);
        return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, err)
    }
};

module.exports.update = async (data, id) => {
    try {
        const pharmacy = await pharmacyModel.findById(id);
        if (!pharmacy) {
            return utils.responseConstructor(utils.STATUS_CODE.NOT_FOUND, null, "utilisateur");
        }
        const updateObject = utils.setUpdateObject(pharmacy, data);
        const userUpdated = await updateObject.save();
        return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, userUpdated);
    } catch (err) {
        console.log("pharmacy.service.updateUser=>", err);
        return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, err)
    }
};

module.exports.remove = async (id) => {
    try {
        const pharmacy = await pharmacyModel.findById(id);
        if (!pharmacy) {
            return utils.responseConstructor(utils.STATUS_CODE.NOT_FOUND, null, "utilisateur");
        }
        await pharmacyModel.deleteOne({_id:id});
        return utils.responseConstructor(utils.STATUS_CODE.SUCCESS, 'ok');
    } catch (err) {
        console.log("pharmacy.service.remove=>", err);
        return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, err)
    }
};