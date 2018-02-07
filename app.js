var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config.js');
var ejs = require('ejs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var http = require('http');
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('./models/user.js');
var util = require('util');
var routes = require('./routes/index');

var app = express();

mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected correctly to server");
});

app.use('/', routes);

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/images'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./authenticate.js')(passport);


app.use(function(req,res,next){
    var err = new Error('Not found');
    err.status('404');
    next('err');
});

app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    })
})

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});