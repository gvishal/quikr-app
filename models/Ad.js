var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserLogin', required: true },

    email: {type: String, required: true},
    quikrId: {type: String},//required = True?
    subCategory: {type: String, required: true},
    cityName: {type: String, required: true},
    locations: {type: String, required: true},
    title : {type: String, required: true},
    description: {type: String, required: true},
    attributes: {type: Schema.Types.Mixed, required: true},
    images: [String],
    mainImage: String,
    price: {type: Number, required: true, default: 0},
    // type contains whether slabs or bid
    type: {type: String, required: true, default: 'slabs'},
    noOfSlabs: {type: Number, default: 0},
    //m.mixed = { any: { thing: 'i want' } };
    //m.markModified('mixed');
    slabs: Schema.Types.Mixed,
    noOfCommiters: {type: Number, default: 0},
    bid: {type: Number},
    date: {type: Date, default: Date.now }

});

module.exports = mongoose.model('Ad', AdSchema);
