var express = require('express');
var path = require('path');
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('./models/user.js');
var config = require('./config.js');


passport.serializeUser(function (user, done) {
    console.log('serializeUser user: ', user)
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('deserializeUser user: ', user);
    done(null, obj);
});

module.exports = function(passport){
    passport.use(new InstagramStrategy({
        clientID: config.instagram.clientID,
        clientSecret: config.instagram.clientSecret,
        callbackURL: config.instagram.callbackURL,
        failWithError: true
    }, function(accessToken, refreshToken, profile, done){ 
        User.findOne({oauthID: profile.id}), function(err, user) {
            console.log('err_1: ', err);
            console.log('user_1: ', user);
            if(err) {
                console.log(err);
            }
            if(!err && user != null) {
                done(null, user);
            } else {
                user = new User({
                    oauthID: profile.id,
                    name: profile.displayName,
                    created: Date.now()
                });
                user.save(function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        // save user
                        done(null, user);
                    }
                });
            }
        }
    }));
}