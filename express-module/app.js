// The express is similar to that of the 
// http server but has many advantages and utilities
const express = require('express');
const fs = require("fs");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const { triggerAsyncId } = require('async_hooks');

// create dummy database
const dummyDB = (() => {
    const dummyDB = {};
    const storage = [];
    let count = 1;
    dummyDB.get = (id) => {
        if(id){
            id = (typeof id == 'string') ? Number(id) : id;
            for(var i in storage) if(storage[i].id == id) {
                return storage[i];
            }
        } else {
            return storage;
        }
    };

    dummyDB.insert = (data) => {
        data.id = count++;
        storage.push(data);
        return data;
    };

    dummyDB.remove = (id) => {
        id = (typeof id == 'string') ? Number(id) : id;

        for(var i in storage) if (storage[i].id == id) {
            storage.splice(i,1);
            return true;
        }
        return false;
    };

    return dummyDB;
})();

// create server application
const app = express();

// set-up the middleware
app.use(bodyParser.urlencoded(
    {extended: false}
))

app.get('/user', (req, res) => {
    res.send(dummyDB.get());
});

app.get('/user/:id', (req, res) => {
    res.send(dummyDB.get(req.params.id));
});

app.post('/user', (req, res)=> {
    const name = req.body.name;
    const region = req.body.region;
    if(name && region){
        res.send(dummyDB.insert({
            name:name,
            region:region
        }));
    } else {
        throw new Error('error');
    }
})

app.put('/user/:id', (req, res)=> {
    const id = req.params.id;
    const name = req.body.name;
    const region = req.body.region;
    const item = dummyDB.get(id);
    item.name = name || item.name;
    item.region = region || item.region;

    res.send(item);
});

app.delete('/user/:id', (req, res) => {
    res.send(dummyDB.remove(req.params.id));
});


app.listen(3000, ()=>{
    console.log("Server is running at port 3000")
});