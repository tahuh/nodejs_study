// import required modules from nodeJS
// similar to python syntax as
// import fs
// import http

const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res)=> {
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
        const htmlDocument = data;
        res.end(htmlDocument);
    })
}).listen(3000, () => {
    console.log("server is running at the port 3000")
})
