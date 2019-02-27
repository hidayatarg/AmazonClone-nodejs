// Load Packages
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// express instance
const app = express();
// reading data in specific json format
app.use(bodyParser.json());
// url encoded (reading all source of data => false)
app.use(bodyParser.urlencoded({
    extended: false
}));
// log out all request to terminal
app.use(morgan('dev'));


