const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        match: /^[a-z ,.'-]{1,25}$/i
    },
    last_name: {
        type: String,
        required: true,
        match: /^[a-z ,.'-]{1,25}$/i
    },
    username: {
        type: String,
        required: true,
        unique:true,
        match: /^[a-z0-9._-]{4,25}$/i
    },
    email:{
        type:String,
        required: true,
        unique:true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    mobile_number: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/
    },
    password: {
        type: String,
        required:true
    },
    availability_status: {
        type: String    // not boolean because 3 possibilities "online & available", "online & not available", "offline"
    },
    current_location: {
        type: [Number]  // array of two numbers
    },
    driver_license: {
        type: String // String stores the path to the image.
    },
    current_order_id:{
        type: String  //To which address the item has to be delivered.
    },
    driver_image: {
        type: String // String stores the path to the image.
    },
    earnings: {
        type: Number,
    },
    ratings: {
        type: Number,
    },
    deliveredOnTime: {
        type: Number
    },
    cancellationRate: {
        type: Number
    }
});

module.exports = mongoose.model('Driver', driverSchema);