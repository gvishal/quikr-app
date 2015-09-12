var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommiterSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserLogin', required: true },
    adId: {type: Schema.Types.ObjectId, ref: 'Ad', required: true},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Commiter', CommiterSchema);
