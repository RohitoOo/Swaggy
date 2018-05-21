const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Restaurant = require('../models/restaurant');


router.post('/register',function(req,res){
    const customer = new Customer();

    let nameRegex = /^[a-z ,.'-]{1,25}$/i;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneNumberRegex = /^[0-9]{10}$/;
    let addressRegex = /^[a-z 0-9,.'-]{20,300}$/i;

    customer.customerId = req.body.customerId;

    customer.firstName = req.body.firstName;
    if(!customer.firstName.match(nameRegex)){
        if(customer.firstName.length > 25) throw 'first name can\'t be more than 25 characters';
        else throw 'First name invalid, no special characters allowed';
    }

    customer.lastName = req.body.lastName;
    if(!customer.lastName.match(nameRegex)){
        if(customer.lastName.length > 25) throw 'first name can\'t be more than 25 characters';
        else throw 'Last name invalid, no special characters allowed';
    }

    customer.email = req.body.email;
    if(!customer.email.match(emailRegex)) throw 'Invalid email';

    customer.phoneNumber = req.body.phoneNumber;
    if(!customer.phoneNumber.match(phoneNumberRegex)) throw 'Invalid phone number, enter 10 digits, no spaces';

    customer.password = req.body.password;
    customer.confirmPassword = req.body.confirmPassword;
    customer.address = req.body.address;
    if(!customer.address.match(addressRegex)) throw 'Invalid Address';

    customer.save(function(err){
        if(err) throw err;
        res.json({"Status" : "Customer Saved"});
    });
});

//Home Screen for viewing all restaurants

router.get('/home', function(req, res) {
    Restaurant.find({}, function (err, restaurants) {
        if (err) {
            console.log(err)
        } else {
            console.log(restaurants);
            res.json(restaurants);
            res.end();
        }
    })
});

//View Customer for viewing all restaurants

router.get('/viewCustomer', function(req, res) {
    Customer.find({}, function (err, customers) {
        if (err) {
            console.log(err)
        } else {
            console.log(customers);
            res.json(customers);
            res.end();
        }
    })
});

//On selecting restaurant :restaurantId is used to find the required restaurant

router.get('/restaurantDetails/:restaurantId', function(req, res) {
    Restaurant.find({restaurantId : req.params.restaurantId}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
            res.end();
        }
    })

});

// TEST FOR DATA RESTAURANT DATA

router.post('/restaurantDataTest',function(req,res){
    const restaurant = new Restaurant();

    restaurant.restaurantId = req.body.restaurantId;
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.restaurantEmail = req.body.restaurantEmail;
    restaurant.restaurantPhoneNumber = req.body.restaurantPhoneNumber;
    restaurant.restaurantAddress = req.body.restaurantAddress;
    restaurant.restaurantGeoLocation = req.body.restaurantGeoLocation;

    restaurant.save(function(err){
        if(err) throw err;
        res.json({"Status" : "Restaurant Saved"});
    });
});


module.exports = router;