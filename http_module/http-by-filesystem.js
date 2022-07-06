// import required modules from nodeJS
// similar to python syntax as
// import fs
// import http

const fs = require('fs');
const http = require('http');

// HTML text server
const htmlServer = http.createServer((req, res)=> {
    // implement our server!
    fs.readFile("index.html", (err, data) =>{
        if(err){console.log("Error has raised!");}
        // without error, we have html document content
        // in variable name called data which is the second
        // argument of this arrow function
        res.writeHead(
            200, {'Content-Type': 'text/html'}
        );
        // res.end(
        //     data
        // );

        // or we can do this in explicit way below
        const htmldocument = data;
        res.end(htmldocument);
    })
}).listen(3000, () => {
    console.log("server is running at the port 3000")
})

// audio server
const audioServer = http.createServer((req, res)=> {
    // implement our server!
    fs.readFile("audio.mp3", (err, data) =>{
        if(err){console.log("Error has raised!");}
        // without error, we have html document content
        // in variable name called data which is the second
        // argument of this arrow function
        // this case we are reading an mp3 file so the header
        // must be the audio/mp3
        res.writeHead(
            200, {'Content-Type': 'audio/mp3'}
        );
        // res.end(
        //     data
        // );

        // or we can do this in explicit way below
        const audioDocument = data;
        res.end(audioDocument);
    })
}).listen(3001, () => {
    console.log("server is running at the port 3001")
})


// image server
const imageServer = http.createServer((req, res)=> {
    // implement our server!
    fs.readFile("watermelon.png", (err, data) =>{
        if(err){console.log("Error has raised!");}
        // without error, we have html document content
        // in variable name called data which is the second
        // argument of this arrow function
        // this case we are reading an png file so the header
        // must be the image/png
        res.writeHead(
            200, {'Content-Type': 'image/png'}
        );
        // res.end(
        //     data
        // );

        // or we can do this in explicit way below
        const imageDocument = data;
        res.end(imageDocument);
    })
}).listen(3002, () => {
    console.log("server is running at the port 3002")
})
