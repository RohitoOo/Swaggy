var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    customerId: {
        type: String,
        required: true,
        index: { unique: true }
        },
    customerEmail : {
        type: String,
        require: 'Email Address is required',
    },
    firstName: {
        type: String,
        required: true,
        match : /^[a-z ,.'-]{1,25}$/i
    },
    lastName: {
        type: String,
        required: true,
        match : /^[a-z ,.'-]{1,25}$/i
    },
    phoneNumber: {
        type: String,
        required: true,
        index: { unique: true },
        match : /^[0-9]{10}$/
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        match : /^[a-z 0-9,.'-]{20,300}$/i
    }
});

module.exports = mongoose.model('Customer',customerSchema);