'use strict';

var nats = require('nats').connect();

nats.on('error', function(e) {
    console.log('Error [' + nats.options.url + ']: ' + e);
    process.exit();
});

nats.on('close', function() {
    console.log('CLOSED');
    process.exit();
});

var subject = process.argv[2];

if (!subject) {
    console.log('Usage: node-sub <subject>');
    process.exit();
}

console.log('Listening on [' + subject + ']');

nats.subscribe(subject, {'queue': 'customer_queue'}, function(msg) {
    console.log('Received "' + msg + '"');
});