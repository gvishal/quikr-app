var express = require('express');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var secret = "Seems Silly to make this a";  // the secret used by jwt
var router = express.Router();

var mongoose = require('mongoose');

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

router.route('/login')
// .all(function(req, res, next) {
//   // runs for all HTTP verbs first
//   // think of it as route specific middleware!
//   console.log("All");
//   next();
// })
// .get(function(req, res, next){
//   var message = ' Loaded api/login homepage.';
//   logRequest(req, message);

//   res.json({status : 'Api Get Login working'});
// })
.post(function (req, res, next) {
  var message = ' Logging in attempt.';
  logRequest(req, message);

  console.log(req.body);
  var userLogintry = new UserLogin(req.body);
  var subpass = userLogintry.password;

  console.log("Login attempt by user claiming to be " + userLogintry.username);

  // TODO: load profile from users database
  var session = {username : userLogintry.username};

  UserLogin.findOne({username: userLogintry.username}, function(err, userlogin){
    if(err){ return next(err); }

    if (userlogin == null)  {
        res.json({status: "Bad Name/Key Pair"});
    } else {
      userlogin.comparePassword(subpass, function(err, isMatch) {
        if (err) { return next(err); }
        if (isMatch) {
          var token = jwt.sign(session, secret, { expiresInMinutes: 600 });
          console.log("Setting token");
          userlogin.current_token = token;
          userlogin.save();
          return res.json({status: "success", token: token, session: session});
        } else {
          res.json({status: "Bad Name/Key Pair"});
        }
      }); 
    }   

  });
})

router.post('/signup', function (req, res, next) {
  var message = ' signup attempt.';
  logRequest(req, message);

  var userlogin = new UserLogin(req.body);

  var fields = ["username", "password", "email"];
  for(field in fields) {
    if(userlogin[fields[field]] == undefined) {
      return res.status(400).json({status: "Please specify all parameters"});
    }
  }

  // If email parameter is not specified then do not check its validity.
  if(userlogin["email"] != undefined && userlogin["email"]){
    var emailRegex = /\S+@\S+\.\S+/;
    if(!emailRegex.test(userlogin.email)){
      return res.status(400).json({status: "Invalid email"});
    }
  }

  console.log("Signup attempt by user calling themselves " + userlogin.username);

  userlogin.current_token = '';
  userlogin.save(function (err, userlogin){
    if(err){ 
      if (err.name == "MongoError" && err.code == 11000) {
        return res.status(400).json({status: "Username Already Exists"});
      } else {
        return next(err); 
      }
    } else {
      return res.json({status: "success"});
    }
  })
});