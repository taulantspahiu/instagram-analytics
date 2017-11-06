var mongoose = require('Mongoose'),
    Schema = mongoose.Schema,
    passport = require('passport'),
    passportInstagramMongoose = require('passport-instagram')

var connection = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followers: [
        {
            name: String,
            instagram_id: String,
            others: String //check what you can get (link, etc)
        }
    ],
    following: [
        {
            name: String,
            instagram_id: String,
            others: String //check what you can get
        }
    ]
}, {
    timestamps: true
})

Connection.plugin(passportInstagramMongoose);
module.exports = mongoose.model('Connection', connection)