const http = require('http');

const server = http.createServer();

server.on('request', (code) =>{
    console.log("Request On");
})

server.on('connection', (code) =>{
    console.log('connection on');
})

server.on('close', (code) => {
    console.log('close');
})

server.listen(3000);