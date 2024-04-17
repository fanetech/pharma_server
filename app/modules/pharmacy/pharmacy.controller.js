const requestUtils = require('../../others/requestUtils')
const pharmacyService = require("./pharmacy.service")

module.exports.create = async (req, res) => {
  const response = await pharmacyService.create(req.body);
  return requestUtils.globalSatuts(res, response);
};


module.exports.getById = async (req, res) => {
    const response = await pharmacyService.getById(req.params.id);
    return requestUtils.globalSatuts(res, response);
  };
  
  module.exports.getAll = async (req, res) => {
    const response = await pharmacyService.getAll();
    return requestUtils.globalSatuts(res, response);
  };
  
  module.exports.update = async (req, res) => {
    const response = await pharmacyService.update(req.body, req.params.id);
    return requestUtils.globalSatuts(res, response);
  };
  
  module.exports.remove = async (req, res) => {
    const response = await pharmacyService.remove(req.params.id);
    return requestUtils.globalSatuts(res, response);
  };