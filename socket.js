var net = require('net');

var client = new net.Socket();
client.connect(1001, '187.49.205.226', function() {
    console.log('conectou');
});

client.on('data', function(data) {
	console.log('Received: ' + data.toLocaleString('hex'));
});

client.on('close', function() {
	console.log('Connection closed');
});