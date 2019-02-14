const NATS = require('nats');
const nats = require('nats').connect();

nats.on('error', function (e) {
    console.log('Error [' + nats.options.url + ']: ' + e);
    process.exit();
});

const subject = 'my_subject';
const msg = 'Random message ' + Math.floor(Math.random() * 10000);

// Request with Auto-Unsubscribe. Will unsubscribe after
// the first response is received via {'max':1}
console.log('Request a message', msg);

nats.request(subject, msg, {'max': 1}, function (response) {
    console.log('Got a response for help: ' + response);
    process.exit();
});