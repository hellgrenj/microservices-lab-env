const Redis = require("ioredis");
const redis = new Redis(6379, "redis");
const io = require('socket.io')(8787);
const moment = require('moment');

io.on('connection', function (socket) {
    console.log('a user connected');
});
redis.subscribe("systemevents", function (err, count) {});
redis.on("message", function (channel, message) {
    console.log("Receive message %s from channel %s", message, channel);
    const msg = `${moment().format('LTS')} ${message}`;
    io.emit('message', msg);
});

