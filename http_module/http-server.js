const http = require('http');

/**
 * http protocol has
 * 1. Starting line
 * 2. Header
 * 3. Document 본문
 * 
 * Starting line : GET / HTTP / 1.1 의 형태
 * HEADER : 어떤 형식을 지원하는지 {Content-Type:text/html 등}
 * 문서 본문 : 실제 HTML 문서
 */
const server = http.createServer((req, res) =>{
    // req : request from the browser
    // res : response of the server
    res.writeHead(
        // write down the response head
        200, {'Content-Type': 'text/html'}
    );

    res.end(
        // write down the response head
        "<h1>Hello web server from nodeJS!</h1>"
    );
}).listen(
    3000, () => {
        console.log("now server is running at the port 3000")
    }
)