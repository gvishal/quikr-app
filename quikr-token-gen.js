var crypto = require('crypto')
  , text = 'I love cupcakes'
  , key = 'abcdeg'
  , hash

var moment = require('moment')
var async = require("async");

var appId = 519
var appSecret = "938f553e22be73fd5d40b041f5ed1928"


hash = crypto.createHmac('sha1', key).update(text).digest('hex')

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

      console.log(body)
      callback(null, body)
    });

}

async.series([genAccessToken(callback)],
    function(err, results){
        resp = results
        console.log(resp)
    })