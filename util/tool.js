var crypto = require('crypto')
var CryptoJS = require('crypto-js')

module.exports = {
    base64EncodedString: function(string) {
        return new Buffer(string).toString('base64')
    },
    stringWithBase64EncodedString: function(base64EncodedString) {
        return new Buffer(base64EncodedString, 'base64').toString();
    },
   
    signString: function(string, secretkey) {
        
        return CryptoJS.HmacSHA1(string, secretkey).toString(CryptoJS.enc.Base64)

    }
}