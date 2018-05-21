var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    restaurantId: { type: String, required: true, index: { unique: true } },
    restaurantName: { type: String, required: true},
    restaurantEmail: { type: String, required: true},
    restaurantPhoneNumber: { type: String, required: true },
    restaurantAddress: { type: String, required: true },
    restaurantGeoLocation: { type: String, required: true },


});

module.exports = mongoose.model('Restaurant',restaurantSchema);