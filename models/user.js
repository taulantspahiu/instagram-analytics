var mongoose = require('Mongoose'),
    Schema = mongoose.Schema,
    passport = require('passport'),
    passportInstagramMongoose = require('passport-instagram');

var user = new Schema({
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

User.plugin(passportInstagramMongoose);
module.exports = mongoose.model('User', user)