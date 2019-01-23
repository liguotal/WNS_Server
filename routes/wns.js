let wnsController = require('../controler/wnsController')
let express = require('express')
let router = express.Router()

router.get('/getOnlineStatus',wnsController.getOnlineStatus)
router.get('/notifyOnlineStatus',wnsController.notifyOnlineStatus)
router.get('/sendMsgNew',wnsController.sendMsgNew)

module.exports = router
