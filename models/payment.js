const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    Payment_Type: {type: String},
    Amount: {type:Number}
});

module.exports = mongoose.model('Payment', paymentSchema);