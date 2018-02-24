var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var util = require('util');
var InstagramStrategy = require('passport-instagram').Strategy;

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');

var config = require('./config.js');
var ejs = require('ejs');
var http = require('http');
var User = require('./models/user.js');

mongoose.connect('mongodb://localhost:27017/instagram-analytics');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected correctly to server");
});

var app = express();

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/images'));
// Global vars
/*app.use(function(req, res, next){
    next();
});*/


require('./authenticate.js')(passport);
var routes = require('./routes/index');
app.use('/', routes);


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