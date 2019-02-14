const nats = require('nats').connect();

nats.on('error', function (e) {
    console.log('Error [' + nats.options.url + ']: ' + e);
    process.exit();
});

nats.on('close', function () {
    console.log('CLOSED');
    process.exit();
});

const subject = 'my_subject';

console.log('Listening on [' + subject + ']');

nats.subscribe(subject, function (msg, replyTo) {
    console.log(subject, 'Received "' + msg + '"');
    const delay = Math.random() * 10 * 1000; // second

    setTimeout(() => {
        nats.publish(replyTo, `I can help! after ${delay} second`);
        console.log(`Job done! after ${delay} second`)
    }, delay);
});