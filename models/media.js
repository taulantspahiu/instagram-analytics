var mongoose = require('Mongoose'),
    Schema = mongoose.schema,
    
var media_object = new Schema({
    caption: String,
    children: String,
    comments: String,
    comments_count: Number,
    is_comment_enabled: Boolean,
    like_count: Number,
    media_type: String,
    media_url: String,
    owner: String,
    permalink: String,
    shortcode: String,
    thumbnail_url: String
}, {
    timestamps: true
})