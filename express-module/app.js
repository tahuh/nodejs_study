// The express is similar to that of the 
// http server but has many advantages and utilities
const express = require('express');
const fs = require("fs");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// create server application
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) =>{
    if(req.cookies.auth) {
        res.send("<h1>Login!</h1>");
    } else {
        res.redirect("/login");
    }
});

app.get('/login', (req, res) =>{
    fs.readFile("login.html", (err, data) => {
        if(err){console.log(err)}
        res.send(data.toString());
    })
});

app.post('/login', (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    if(username == "huh" && password == "1234") {
        res.cookie('auth' , true);
        res.redirect('/');
    } else{
        res.redirect('/login');
    }
});

app.listen(3000, () =>{
    console.log('express server is running at port 3000')
})