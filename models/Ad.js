var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserLogin', required: true },

    subCategory: {type: String, required: true},
    cityName: {type: String, required: true},
    locations: {type: String, required: true},
    title : {type: String, required: true},
    description: {type: String, required: true},
    attributes: {type: String, required: true},
    images: [String],
    date: {type: Date, default: Date.now }

});

module.exports = mongoose.model('Ad', AdSchema);
