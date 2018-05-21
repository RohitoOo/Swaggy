const express = require('express');
const router = express.Router();
const Driver = require('../models/driver');
const Order = require('../models/order');
const bcrypt = require('bcrypt');


router.post('/register', (req, res) => {

    // for input validation
    let nameRegex = /^[a-z ,.'-]{1,25}$/i;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mobileNoRegex = /^[0-9]{10}$/;
    let usernameRegex = /^[a-z0-9._-]{4,25}$/i;

    // saving into memory
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let mobile_number = req.body.mobile_number;
    let username = req.body.username;

    // checking if inputs are valid
    if(!first_name.match(nameRegex)){
        if(first_name.length > 25) throw 'first name can\'t be more than 25 characters';
        else throw 'first name invalid, no special characters allowed';
    }
    if(!last_name.match(nameRegex)) {
        if(last_name.length > 25) throw 'last name can\'t be more than 25 characters';
        else throw 'last name invalid, no special characters allowed';
    }
    if(!email.match(emailRegex)) throw 'invalid email';
    if(!mobile_number.match(mobileNoRegex)) throw 'invalid phone number, enter 10 digits, no spaces';
    if(!username.match(usernameRegex)) {
        if (username.length > 25) throw 'username  can\'t be more than 25 characters';
        else if (username.length < 4) throw 'username can\'t be less than 4 characters';
        else throw 'invalid username, can\'t contain special characters';
    }

    // checking if email, username and phone number is unique.
    Driver.find({email:email}, (err, driver) => {
        if(!err && driver.length){
            throw 'email already registered';
        }
    });

    Driver.find({username: username}, (err, driver) => {
        if(!err && driver.length){
            throw 'this username is taken';
        }
    });

    Driver.find({mobile_number:mobile_number}, (err, driver) => {
        if(!err && driver.length){
            throw 'mobile number already registered';
        }
    });

    // proceed with creating new driver and saving it to database.
    let driver = new Driver();
    driver.first_name = first_name;
    driver.last_name = last_name;
    driver.email = email;
    driver.username = username;
    driver.password = bcrypt.hashSync(req.body.password, 10);
    driver.mobile_number = mobile_number;

    driver.save((err) => {
        if (err) throw err;
        res.json({driver});
    })

});

router.get('/home', (req, res) => {

    // get id for logged in driver (TODO)
    let loggedInDriverId = "5afef0996bc71a4dd96213c8";

    // if not logged in, redirect to login page
    if(!loggedInDriverId){
        res.redirect('/login');
    }

    // get ongoing order details every 3 second
    setInterval(() => {
        Order.find({driverId:loggedInDriverId, completed:false}, (err, ongoingOrder) => {
            if(err) throw err;
            console.log(ongoingOrder);
        });
    }, 3000);


    // get completed orders
    Order.find({driverId: loggedInDriverId, completed: true}, (err, completedOrders) => {
        if (err) throw err;
        console.log(completedOrders);
    });


    // if not logged in, redirect to login page
    // get all past orders, display it.
    // if offline, display toggle button to go online, when checked, change status to 'online and available'
    // if online, check for incoming orders every minute, also update driver's current location every minute
    // if there is an order, display it in 'active orders'
    // if order is accepted, change status to 'online and not available'
    // then fetch all details of order and display it.
    // order completion cycle //TODO
});



router.get('/all', (req, res) => {
    Driver.find({},function(err,drivers){
        if(err){
            throw err;
        }
        res.json(drivers);
    });
});


module.exports = router;