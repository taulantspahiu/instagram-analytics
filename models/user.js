var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passport = require('passport'),
    passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
    oauthID: Number,
    display_name: String,
    full_name: String,
    profile_picture: String,
    username: String,
    followed_count: Number,
    follows_count: Number,
    media_count: Number,
    bio: String,
    website: String,
    is_business: Boolean
}, {
    timestamps: true
})

user.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', user)