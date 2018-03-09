const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3000;

server.use(body-parser());

server.listen(PORT, (err) => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
})