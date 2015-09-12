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
    price: {type: Number, required: true},
    // type contains whether slabs or bid
    type: {type: String, required: true},
    noOfSlabs: {type: Number, required: true},
    //m.mixed = { any: { thing: 'i want' } };
    //m.markModified('mixed');
    slabs: Schema.Types.Mixed,
    noOfCommiters
    date: {type: Date, default: Date.now }

});

module.exports = mongoose.model('Ad', AdSchema);
