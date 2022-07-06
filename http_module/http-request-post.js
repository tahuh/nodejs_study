const http = require('http');
const fs = require('fs');


http.createServer((req, res)=> {
    if(req.method == 'GET'){
        fs.readFile('post.html', (err, data)=>{
            res.writeHead(
                200, {'Content-Type' : 'text/html'}
            )
            res.end(data);
        })
    } else if (req.method == 'POST') {
        req.on(
            'data', (data) => {
                res.writeHead(
                    200, {'Content-Type' : 'text/html'}
                )
                res.end('<h1>' + data + '</h1>');
            }
        )
    }
}).listen(3000, ()=>{
    console.log("server is now running at 3000")
})