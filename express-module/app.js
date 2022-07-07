// The express is similar to that of the 
// http server but has many advantages and utilities
const express = require('express');
const fs = require("fs");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// create server application
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(
    session({
        secret :'secret key',
        resave: false,
        saveUninitialized: true
    })
);

app.use((req, res) => {})

app.listen(3000, () =>{
    console.log('express server is running at port 3000')
})