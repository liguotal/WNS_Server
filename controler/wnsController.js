let BaseController = require('./baseController')
let config = require('../conf/config')

class WnsController extends BaseController {
    constructor() {
        super()
    }

    async getOnlineStatus(req, res, next) {

        res.send({
            code: '200',
            msg: 'successful'
        })
    }

    async sendMsgNew(req, res, next) {


    }

    async notifyOnlineStatus(req, res, next) {


    }


}

module.exports =  new WnsController();
