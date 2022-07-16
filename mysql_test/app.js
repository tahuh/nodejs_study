// const http = require('http'); // we are not using this for server but using express
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const pug = require('pug'); // template engine

// connect to the MySQL
const mysqlClient = mysql.createConnection({
    host:"localhost",
    user:"tahuh",
    password: "Celestial1124!"
});

// Create database if not exist
mysqlClient.connect(
    (err)=>{
        if(err) throw err;
        console.log("Connected to the MySQL");
        mysqlClient.query("CREATE DATABASE IF NOT EXISTS imbdx", (qerr, result) => {
            if(qerr) throw qerr;
            console.log("Database imbdx has created");
        });
    }
)

mysqlClient.query(
    'USE imbdx', (err, result) => {
        if(err) throw err;
        console.log("Using database imbdx");
    }
);

// Create table if not exists
// todo create a table
const sqlQuery = "CREATE TABLE IF NOT EXISTS incomeSamples " +
"(" + 
"id INT AUTO_INCREMENT PRIMARY KEY, " +
"labId VARCHAR(255), donor VARCHAR(255), " + 
"sampleType VARCHAR(255), sampleDate VARCHAR(255), " + 
"dnaConc FLOAT(3)" +
")"
console.log(sqlQuery);
mysqlClient.query(
    sqlQuery, (err, result) =>{
        if(err) throw err;
        console.log("Created TABLE incomeSamples");
    }
)

// NodeJS Server application set-up
const app = express();

// set-up the middleware
app.use(bodyParser.urlencoded({extended:false}));
// set template engine as pug
app.set('view engine', 'pug');
// tell where is the pug files located
app.set('views', __dirname + '/views');

// execute the server
app.listen(
    3000, () =>{
        console.log("Server is running at port 3000");
    }
)

// TODO: Routing!
// this is the landing page
app.get('/', (req, res) => {
    // let's get the data from the mysql database
    const sql = "SELECT * from incomeSamples"

    mysqlClient.query(sql, (err, result, fields) => {
        // now we are using PUG!
        // Ok. here is the rule
        // res.render requires at least two arguments
        // the first one is the pug's file name except .pug suffix
        // the second one is an object that describes the variable in template engine

        // we have home.pug under views directory
        // and it requires some data to be displayed
        console.log("SQL result = ", result);
        res.render('home', {
            numSamples : result.length,
            sqlData : result
        });
    })
    
})

// A page that inserts item to database
app.get('/insert' ,(req, res)=> {
    // with given 'req'uest (i.e. GET method access to /insert)
    // the 'res'pond to the client is to 'render' the 'insert' pug page
    res.render('insert');
})

// A page that actually behaves insertion
app.post('/insert', (req, res) => {
    // get the body of the new page
    // POST refresh your page
    const body = req.body;
    const sql = "INSERT INTO incomeSamples " +
    "(labId, donor, sampleType, sampleDate, dnaConc) " + 
    "VALUES (?, ?, ?, ?, ?) "
    mysqlClient.query(
        sql,[
            body.labid, body.donor, 
            body["sample-type"], body["sample-date"], body["dna-conc"]
        ], () => {
            // goto the home page!
            res.redirect("/");
        }
    )
});

// A page that actually deletes an item
app.get('/delete/:id', (req, res) => {

    // here the question mark '?' refers to the
    // random item (not defined item)
    // It is very similar to that of the
    // variable!
    const sql = "DELETE FROM incomeSamples WHERE id=?";
    mysqlClient.query(sql, [req.params.id], (err, results, fields) => {
        if(err)
            console.log(err.message);
        console.log("deleting sample id = " + req.params.id);
        console.log("Deleted row(s):", results.affectedRows)
        res.redirect("/"); // go to the home page
    });
})

// A page that shows editing item
app.get('/edit/:id', (req, res) =>{
    // very simple!
    // render our page!
    const sql = "SELECT * FROM incomeSamples WHERE id=?"
    mysqlClient.query(sql, [req.params.id], (err, results, fields) => {
        if(err) throw err; 
        console.log(req.params.id);
        res.render("edit", {
            data:results[0]
        });
    })
    
});

// A page that actually performs editing
app.post('/edit/:id', (req, res) => {
    // we get post request
    // we have to perform the update!
    const body = req.body; // the POST form body
    // , SET donor=?, SET sampleType=?, SET sampleDate=?, SET dnaConc=? 
    const sql = "UPDATE incomeSamples SET labId=?, donor=?, sampleType=?, sampleDate=?, dnaConc=? WHERE id=?";
    mysqlClient.query(sql, [
        // access through the form's `name` attribute of the `input` tag
        body.labid, body.donor, body["sample-type"], body["sample-date"], body["dna-conc"], req.params.id
    ], (err, results, fields) => {
        if(err) {
            console.log(err.message);
            throw err;
        };
        // without any issue
        // redirect to the main page!
        res.redirect("/");
    })
})