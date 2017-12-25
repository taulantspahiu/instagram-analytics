var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

module.exports = mongoose.model('Connection', connection)