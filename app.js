var express = require('express');	// express is the web framework for nodejs projects
var app = module.exports = express();	// 'app' is the express object

// section 1b: getting all the other modules
var path = require('path');		// module for handling and transforming file paths. __dirname is pwd
var favicon = require('serve-favicon');	// serve the favicon, website shortcut icon
var logger = require('morgan');		// http request logger
var cookieParser = require('cookie-parser');	// parse cookies
var bodyParser = require('body-parser');	// express middleware that reads a form's input and stores as a js object
var mongoose = require('mongoose');		// mongodb object modelling tool

var multer  = require('multer');

require('./models/UserLogin');
require('./models/Video');

mongoose.connect('mongodb://localhost/quikr_database',function(err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});

var index = require('./routes/index');
var api = require('./routes/api');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// section 5: Make the app use the modules 
app.use(favicon(path.join( __dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(multer({ dest: './public/uploads/'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var Video = mongoose.model('Video');

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers
app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    return res.status(401).json({status : 'Unauthorized'});
  }
  return res.status(404).json({status : 'Not found'});
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = Number(process.env.PORT || 8080);	// set the port on which the app will be served

var server = app.listen(port, '0.0.0.0', function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Now listening at http://%s:%s", host, port);
});
