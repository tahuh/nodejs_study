// The express is similar to that of the 
// http server but has many advantages and utilities
const express = require('express');

// create server application
const app = express();

// set-up the event listener
// or 'routing'
app.use((req, res) => {
    res.writeHead(
        200, {'Content-Type': 'text/html'}
    )
    res.end(
        '<h1>Hello Express!</h1>'
    )
});

app.listen(3000, () =>{
    console.log('express server is running at port 3000')
})