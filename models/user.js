var mongoose = require('Mongoose'),
    Schema = mongoose.Schema,
    passport = require('passport'),
    passportInstagramMongoose = require('passport-instagram');

var user = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    followers: Number,
    following: Number,
    instagram_id: String,
    created: Date,
    updated: Date,
}, {
    timestamps: true
})

User.plugin(passportInstagramMongoose);
module.exports = mongoose.model('User', user)