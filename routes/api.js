var express = require('express');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var secret = "Seems Silly to make this a";  // the secret used by jwt
var router = express.Router();
var crypto = require('crypto')

var moment = require('moment')

var mongoose = require('mongoose');

// var tokenGen = require('../quikr-token-gen.js')
var appId = 519
var appSecret = "938f553e22be73fd5d40b041f5ed1928"
// Need to be regenerated every day.
var token = '0a40c78e2d4fac12158627e1d6372539'
var tokenId = 3039209

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

var accessApi = function(apiPath, token, tokenId, callback){
    var url = "https://api.quikr.com" + apiPath
    // console.log(url)
    var apiName = apiPath

    var date = moment().format('YYYY-MM-DD')
    
    var text = appId + apiName + date
    console.log(text)
    var signature = crypto.createHmac('sha1', token).update(text).digest('hex')
    console.log(signature)

    var request = require("request");

    var options = { method: 'GET',
      url: url,
      headers: { 
                  'X-Quikr-App-Id': appId,
                  'X-Quikr-Token-Id': tokenId,
                  'X-Quikr-Signature': signature
                },
      };

    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      // console.log(body)
      // return body  
      callback(null, body)
    });
}


var sys = require('sys');
var exec = require('child_process').exec;

module.exports = router;    // module is the global scope variable. Now the object 'router' is accessible when this file (index.js) is called as a module.

// Method to prevent redundant code for logging the incoming requests.
var logRequest = function(req, message){
  // log on the console
  console.log("-");
  console.log(new Date().toISOString());
  console.log((req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress) + message);
}

var UserLogin = mongoose.model('UserLogin');
var Ad = mongoose.model('Ad');
var Commiter = mongoose.model('Commiter');

/* GET home page. */
router.get('/', function(req, res) {
  var message = ' Loaded api homepage.';
  logRequest(req, message);

  res.json({status : 'Api working'});
});

router.post('/ad', function(req, res, next) {
  logRequest(req, 'Post new ad called')
  
})

router.get('/get-token', function(req, res, next) {
  logRequest(req, 'Get token called')

  // To generate new token everyday
  // genAccessToken(function(err, results){
  //   if(err){return next(err)};
  //   var token = results.token
  //   var tokenId = results.tokenId
  //   var url = '/public/trending'
  //   console.log(results)
  //   accessApi(url, token, tokenId, function(err, results){
  //     return res.json(results)
  //   })    
  // })
  var url = '/public/trending'
  accessApi(url, token, tokenId, function(err, results){
    console.log(results)
    return res.json({"results": results})
  }) 
})

router.get('/products', function(req, res, next) {
  Ad.find({}, function(err, ads){
    if(err){return next(err)}
    return res.json(ads)
  })
})



/*
{ video: 
   { fieldname: 'video',
     originalname: 'www.jetairways.com_EN_IN_Uploads_SpecialOffers_student.pdf',
     name: 'c2f2c0a742dad8ae7e62ded9f9e34801.pdf',
     encoding: '7bit',
     mimetype: 'application/pdf',
     path: 'uploads/c2f2c0a742dad8ae7e62ded9f9e34801.pdf',
     extension: 'pdf',
     size: 63729,
     truncated: false,
     buffer: null } }
*/

router.post('/file-upload', function(req, res) {

  var data = {  
    originalname: req.files.video.originalname,
    parentId: '',       
    name: req.files.video.name,
    size: req.files.video.size,
    version: 0,
    path: req.files.video.path,
    count: 0
  }
  var videoPath = req.files.video.path.split('.');

  var data1 = {  
    originalname: req.files.video.originalname,
    parentId: '',       
    name: req.files.video.name,
    size: req.files.video.size,
    version: 1,
    path: videoPath[0] + '_v1.' + videoPath[1],
    count: 0
  }
  var data2 = {  
    originalname: req.files.video.originalname,
    parentId: '',       
    name: req.files.video.name,
    size: req.files.video.size,
    version: 2,
    path: videoPath[0] + '_v2.' + videoPath[1],
    count: 0
  }
  console.log(data);
  var video = new Video(data);
  video.save(function(err, video){
    if(err){

    } else {
      // set parentId of children and render them.
      data1.parentId = video._id;
      data2.parentId = video._id;
      var video1 = new Video(data1);
      var video2 = new Video(data2);
      video1.save(function(err, video1){});
      video2.save(function(err, video2){});
      res.json({status: "Successfully uploaded", video: video, video1: video1, video2: video2});
    }
  });
});

router.get('/video-list', function(req, res) {
  Video.find({}, function(err, videos){
    if(err){

    } else {
      res.json({videos: videos});
    }
  })
})

router.get('/test-code', function(req, res) {
  function puts(error, stdout, stderr) { sys.puts(stdout) }
  exec("ls -la", puts);
  res.json({status: 'done'})
})

function getVideoIndex() {
  return Math.floor(Math.random()*2) + 1;
}

// /api/video?id=`_id`
router.get('/video', function(req, res) {
  var videoId = null;
  if(req.query && (req.query.id != undefined)) {
    videoId = req.query.id;
  }
  console.log("Request for video id: ", videoId);
  Video.findOne({parentId: videoId, version: getVideoIndex()}, function(err, video) {
    if(err) {

    } else {
      var videoUrl = 'http://192.168.5.158:8080/' + video.path.substring(7);
      console.log(videoUrl);
      res.json({video: video, videoUrl: videoUrl});
      // res.send(videoUrl);
    }
  })
})