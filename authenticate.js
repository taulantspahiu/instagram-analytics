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
        callbackURL: config.instagram.callbackURL
    }, function(accessToken, refreshToken, profile, done){
        process.nextTick(function(){
            User.findOne({oauthID: profile.id}, function(err, user) {
                if(err) {
                    return done(err, null);
                }
                if(!err && user != null) {
                    //user found
                    return done(null, profile);
                } else {
                    // user not found, create new user
                    user = new User({
                        oauthID: profile.id,
                        display_name: profile.displayName,
                        full_name: profile._json.data.full_name,
                        profile_picture: profile._json.data.profile_picture,
                        username: profile._json.data.username,
                        followed_count: profile._json.data.counts.followed_by,
                        follows_count: profile._json.data.counts.follows,
                        media_count: profile._json.data.counts.media,
                        bio: profile._json.data.bio,
                        website: profile._json.data.website,
                        is_business: profile._json.data.is_business
                    });
                    user.save(function(err) {
                        if(err) {
                            return done(err, null);
                        } else {
                            // save user
                            return done(null, profile);
                        }
                    });
                }
            });
        });
    }));
}