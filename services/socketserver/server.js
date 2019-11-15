const Redis = require("ioredis");
const redis = new Redis(6379, "redis");
const io = require('socket.io')(8787);
const moment = require('moment');

io.on('connection', function (socket) {
    console.log('a user connected');
});

redis.subscribe("systemevents", function (err, count) {
    // Now we are subscribed to both the 'news' and 'music' channels.
    // `count` represents the number of channels we are currently subscribed to. 
});

redis.on("message", function (channel, message) {
    console.log("Receive message %s from channel %s", message, channel);
    const msg = `${moment().format('LTS')} ${message}`;
    io.emit('message', msg);
});

// There's also an event called 'messageBuffer', which is the same as 'message' except
// it returns buffers instead of strings.
redis.on("messageBuffer", function (channel, message) {
    // Both `channel` and `message` are buffers.
});
