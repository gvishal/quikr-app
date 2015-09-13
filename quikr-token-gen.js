var crypto = require('crypto')

var moment = require('moment')
var async = require('async');

var appId = 519
var appSecret = "938f553e22be73fd5d40b041f5ed1928"

var genAccessToken = function(callback){
    var url = "https://api.quikr.com/app/auth/access_token"

    var date = moment().format('YYYY-MM-DD')
    // console.log(date)
    var text = "vishalgu@outlook.com" + appId + date
    // console.log(text)
    var signature = crypto.createHmac('sha1', appSecret).update(text).digest('hex')
    // console.log(signature)

    var data = {"appId": appId, "signature": signature}
    console.log(JSON.stringify(data))

    var request = require("request");

    var options = { method: 'POST',
      url: 'https://api.quikr.com/app/auth/access_token',
      headers: { 'content-type': 'application/json' },
      body: data,
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      // console.log(body)
      // return body  
      callback(null, body)
    });

}

// genAccessToken(function(err, results){
//     var resp = results
//     console.log(resp)
//     return resp
// })

module.exports = function(){ 
    genAccessToken = genAccessToken
}