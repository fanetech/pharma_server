const utils = require("./utils");

module.exports = {
    checkRequest : (req) => {
        const id = req?.params?.id
        if ( id) {
          return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, "données indispensable incorect");
        }
        if (utils.isEmpty(req.body)){
          return utils.responseConstructor(utils.STATUS_CODE.UNEXPECTED_ERROR, null, "données indispensable incorect");
        }
        return 1
    },
    globalSatuts : (res, data) => {
        switch (data.status) {
          case SERVER_STATUS.SUCCESS:
            return res.status(SERVER_STATUS.SUCCESS).json(data.send);
          case SERVER_STATUS.UNEXPECTED_ERROR:
             return res.status(SERVER_STATUS.UNEXPECTED_ERROR).json(data.send);
          case SERVER_STATUS.BAD_GATEWAY:
             return res.status(SERVER_STATUS.BAD_GATEWAY).json(data.send);
          case SERVER_STATUS.SERVICE_UNAVAILABLE:
             return res.status(SERVER_STATUS.SERVICE_UNAVAILABLE).json(data.send);
          case SERVER_STATUS.DATA_INCORRECT:
             return res.status(SERVER_STATUS.DATA_INCORRECT).json(data.send);
          case SERVER_STATUS.NOT_FOUND:
             return res.status(SERVER_STATUS.NOT_FOUND).json(data.send);
        
          default:
            break;
        }
      
    }
}

const SERVER_STATUS = {
    SUCCESS: 200,
    UNEXPECTED_ERROR: 500,
    NOT_FOUND: 404,
    DATA_INCORRECT: 400,
    NOT_DATA: 400,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
}