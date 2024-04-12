const requestUtils = require('../../others/requestUtils')
const authService = require("./auth.service")

module.exports.signup = async (req, res) => {
    const reqAnalityc = requestUtils.checkRequest(req)
    if (reqAnalityc !== 1) {
      return requestUtils.globalSatuts(res, reqAnalityc)
    }
    const authServiceCreate = await authService.register(req.body)
    return requestUtils.globalSatuts(res, authServiceCreate)
  };

module.exports.signin = async (req, res) => {
    const reqAnalityc = requestUtils.checkRequest(req)
    if (reqAnalityc !== 1) {
      return requestUtils.globalSatuts(res, reqAnalityc)
    }
    const authServiceCreate = await authService.login(req.body)
    return requestUtils.globalSatuts(res, authServiceCreate)
  };