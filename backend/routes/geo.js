const express = require("express");
const net = require('net');

const router = express.Router();
const client = new net.Socket();

client.connect(3333, '127.0.0.1', function() {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
    console.log('Received: ' + data);
    // client.destroy(); // kill client after server's response
});

client.on('close', function() {
    console.log('Connection closed');
});

setTimeout(function() {
    console.log('timeout');
    // latitude: 51.056297069317516, longitude: 3.6927492083973155
    client.write('51.056297069317516,3.6927492083973155');
}, 10000);

module.exports = router;
