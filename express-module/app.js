// The express is similar to that of the 
// http server but has many advantages and utilities
const express = require('express');

// create server application
const app = express();

// set-up the event listener
// or 'routing'
app.use((req, res) => {
    const outputArray = [];
    for(var i = 0; i < 10; i++) {
        outputArray.push({
            count:i,
            name:'name - ' + i
        })
    }
    res.send(outputArray);
});

app.listen(3000, () =>{
    console.log('express server is running at port 3000')
})