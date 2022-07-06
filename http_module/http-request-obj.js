const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res)=> {
    const pathName = url.parse(req.url).pathname;
    if(pathName == "/") {
        // homepage
        fs.readFile("index.html" , (err, data)=>{
            res.writeHead(
                200,{'Content-Type': "text/html"}
            )
            res.end(data);
        })
    } else if (pathName == "/otherpage") {
        fs.readFile("otherpage.html" , (err, data)=>{
            res.writeHead(
                200,{'Content-Type': "text/html"}
            )
            res.end(data);
        })
    }
}).listen(3000, ()=>{
    console.log("server is now running at 3000")
})