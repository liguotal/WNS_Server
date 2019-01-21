let BaseController = require('./baseController')
let wnsConst = require('../conf/wnsConst')
let api = require('../conf/api')
let request = require('request')
let querystring = require('querystring')
let tool = require('../util/tool')

class WnsController extends BaseController {
    constructor() {
        super()
    }

     
    async getOnlineStatus(req, res, next) {
        let timestamp = Math.round(new Date().getTime()/1000).toString();
        let plaintext = wnsConst.appId + '&' + timestamp;
        let sign = tool.signString(plaintext, wnsConst.secretkey)
        let widArr = ['243191873']

        let requestData = {
            appid : wnsConst.appId,
            secretid: wnsConst.secretId,
            sign: sign,
            tm: timestamp,
            wid: JSON.stringify(widArr)
        }
       
        console.log(requestData)

        request({
            url: api.getOnelineStatusUrl,
            method: "POST",
            json: true,
            formData: requestData,
            headers: {
                "content-type": "application/json",
            },
            // body: requestData
        }, function(error, response, body) {
            if (!error) {
                res.send(
                    body
                )
                console.log(body);
            } else {
                console.log(error)
                // console.log(response.statusCode)
                res.send({
                    code : 201,
                    msg: '失败了123'
                })
            }
        });
       
    }

    async sendMsgNew(req, res, next) {

        let timestamp = Math.round(new Date().getTime()/1000).toString();
        let plaintext = wnsConst.appId + '&' + timestamp;
        let sign = tool.signString(plaintext, wnsConst.secretkey)
       
        let params = {
            appid : wnsConst.appId,
            secretid: wnsConst.secretId,
            sign: sign,
            tm: timestamp,
            wid: 243191873,
            plat: 0,
            tag: 1,
            content: 'nihao'
        }
        
        request({
            url: api.sendMsgNewUrl,
            method: "POST",
            formData: params,
            json: true,
            headers: {
                "content-type": "application/json",
            },
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(
                    body
                )
                console.log(body);
            } else {
                console.log(error)
                console.log(response.statusCode)
                res.send({
                    code : 201,
                    msg: '失败了123'
                })
            }
        });
       
    }

    async notifyOnlineStatus(req, res, next) {

        let timestamp = Math.round(new Date().getTime()/1000).toString();
        let plaintext = wnsConst.appId + '&' + timestamp;
        let sign = tool.signString(plaintext, wnsConst.secretkey)

        let requestData = {
            appid : wnsConst.appId,
            secretid: wnsConst.secretId,
            sign: sign,
            tm: timestamp,
            status: [
                {
                    '123456': [
                        {wid1 : 243191873}
                    ]
                }
            ]
        }
       
        request({
            url: api.notifyOnlineStatusUrl,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(
                    body
                )
                console.log(body);
            } else {
                console.log(error)
                console.log(response.statusCode)
                res.send({
                    code : 201,
                    msg: '失败了123'
                })
            }
        });
       
       
        

        
    }


}

module.exports =  new WnsController();
