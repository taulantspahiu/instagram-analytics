var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passport = require('passport'),
    passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
    oauthID: Number,
    name: String,
    username: String,
    password: String,
    email: String,
    followers_count: Number,
    follows_count: Number,
    media_count: Number,
    biography: String,
    profile_picture: String,
    website: String,
    followers_difference: Number,
    created: Date,
    updated: Date,
}, {
    timestamps: true
})

user.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', user)