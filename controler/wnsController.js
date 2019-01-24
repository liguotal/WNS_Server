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
        let widArr = ['6720119175475286081']
        let wid = JSON.stringify(widArr)
        console.log(wid)

        let requestData = {
            appid : wnsConst.appId,
            secretid: wnsConst.secretId,
            sign: sign,
            tm: timestamp,
            wid: '6720119175475286081'
        }
       
        console.log(requestData)

        request({
            url: api.getOnelineStatusUrl,
            method: "POST",
            json: true,
            body: requestData,
            headers: {
                "content-type": "application/json",
            },
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
        let wid = req.query.wid
        let content = req.query.content
        let plat = req.query.plat || 0
        var tag = req.query.tag || '1'
        let uid = req.query.uid

        if (!wid && !uid) {
            res.send({
                code: '201',
                msg:'wid和uid参数必须存在一个'
            })
            return
        }

        if (!content) {
            res.send({
                code: '201',
                msg:'content参数不能为空'
            })
            return
        }

        let params = {
            appid : wnsConst.appId,
            secretid: wnsConst.secretId,
            sign: sign,
            tm: timestamp,
            plat: plat,
            tag: tag,
            content: content
        }

        if (wid) {
            params['wid'] = wid
        }

        if (uid) {
            params['uid'] = uid
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
                    msg: '失败了'
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
