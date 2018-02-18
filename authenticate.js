var express = require('express');
//var path = require('path');
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('./models/user.js');
var config = require('./config.js');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    
    passport.use(new InstagramStrategy({
        clientID: config.instagram.clientID,
        clientSecret: config.instagram.clientSecret,
        callbackURL: config.instagram.callbackURL,
        failWithError: true
    }, function(accessToken, refreshToken, profile, done){
        process.nextTick(function(){
            User.findOne({oauthID: profile.id}, function(err, user) {
                if(err) {
                    return done(err, null);
                }
                if(!err && user != null) {
                    //user found
                    return done(null, user);
                } else {
                    // user not found, create new user
                    user = new User({
                        oauthID: profile.id,
                        name: profile.displayName,
                        created: Date.now()
                    });
                    user.save(function(err) {
                        if(err) {
                            return done(err, null);
                        } else {
                            // save user
                            return done(null, user);
                        }
                    });
                }
            });
        });
    }));
}