const express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
const app = express();
const Redis = require("ioredis");
const redis = new Redis(6379, "redis");

redis.subscribe("news", "music", function(err, count) {
  // Now we are subscribed to both the 'news' and 'music' channels.
  // `count` represents the number of channels we are currently subscribed to.
});
redis.on("message", function(channel, message) {
  // Receive message Hello world! from channel news
  // Receive message Hello again! from channel music
  console.log("Receive message %s from channel %s", message, channel);
});


app.use(serveStatic(__dirname + "/client/dist"));
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});