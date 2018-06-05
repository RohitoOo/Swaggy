const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconnect');
const driverRoutes = require('./routes/driverRouters');


const app = express();
const PORT = 3133;

app.use(express.static('public'));

//Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use('/driver', driverRoutes);

app.listen(PORT, function(err){
    if(err) throw err;
    console.log('Server is running on port : ' + PORT);
});