const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const server = express();
const PORT = 5000;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

server.use(bodyParser());

server.get('/compare', (req, res) => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(res => res.json())
    .then(json => {
        let currentRateStr = (json.bpi.USD.rate).toString();
        currentRate = currentRateStr.replace(/\,/g,"");
        console.log(currentRate);
        fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
        .then(res => res.json())
        .then(json => {
            let historicalRate = (json.bpi['2018-03-08']);
            console.log(historicalRate);
            const difference = currentRate - historicalRate;
            console.log(difference);
            res.status(STATUS_SUCCESS);
            res.send(`The difference is : ${difference}`);
        })
        .catch(err => {
            console.log(err);
            res.status(STATUS_USER_ERROR);
            res.send( { err: err} );
    })
    .catch(err => {
        console.error(err);
        console.log(err);
            res.status(STATUS_USER_ERROR);
            res.send( { err: err} );
        })
    })
})

server.listen(PORT, (err) => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
})