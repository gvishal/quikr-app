var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = new Schema({
    originalname: String,
    parentId: String,
    name: String, 
    size: Number,
    version: Number,
    path: String,
    count: Number
});

//VideoSchema.pre('save', function(next) {
//    var Video = this;
    // do some stuff before saving to database  
//});

module.exports = mongoose.model('Video', VideoSchema);