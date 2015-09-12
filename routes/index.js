var express = require('express'); 
var router = express.Router();

// section 3: handle requests
// callback funcition 'req' (request) and 'res' (response)
module.exports = router;	// module is the global scope variable. Now the object 'router' is accessible when this file (index.js) is called as a module.

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

/* GET home page. */
router.get('/', function(req, res) {
  var message = ' Loaded homepage.';
  logRequest(req, message);

  // render index.ejs
  res.render('index', { title: 'Express' });
});