var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var config = require('../config.js');
var User = require('../models/user.js');

router = express.Router();

router.get('/', function(req, res){
    res.render('login', { user: req.user });
});

router.get('/test', function(req, res){
    res.send('test is ok');
});

router.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
});

router.get('/home', function(req, res){
    res.render('index', { user: req.user });
});

router.get('/logged-out', function(req, res){
    res.render('loggedOut', { user: req.user });
});


// GET /auth/instagram
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Instagram authentication will involve
//   redirecting the user to instagram.com.  After authorization, Instagram
//   will redirect the user back to this application at /auth/instagram/callback
router.get('/auth/instagram',
    passport.authenticate('instagram'),
    function (req, res) {
        console.log('error: it is inside /auth/instagram');
        // The request will be redirected to Instagram for authentication, so this
        // function will not be called.
    }
);


// GET /auth/instagram/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

router.get('/auth/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/home');
    }
);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/logged-out');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next();}
    res.redirect('/');
}

module.exports = router;