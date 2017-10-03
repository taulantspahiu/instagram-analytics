var passport = require('passport');
var instagramStrategy = require('passport-instagram').Strategy;
var User = require('/user');
var config = require('./config.js');

passport.use = (new InstagramStrategy({
    clientID: config.instagram.clientID,
    clientSecret: config.instagram.clientSecret,
    callbackURL: config.instagram.callbackURL
}, function(accessToken, refreshToken, profile, done){
    User.findOne({oauthID: profile.id}), function(err, user) {
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
}))
