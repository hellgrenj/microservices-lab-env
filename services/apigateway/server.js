const express = require('express')
const app = express()
const port = process.env.PORT
const axios = require('axios')
const cors = require('cors')
const Redis = require("ioredis");
const redis = new Redis(6379, "redis");
var pub = new Redis(6379, "redis");
redis.subscribe("news", "music", function(err, count) {
  // Now we are subscribed to both the 'news' and 'music' channels.
  // `count` represents the number of channels we are currently subscribed to.

  
});

redis.on("message", function(channel, message) {
  // Receive message Hello world! from channel news
  // Receive message Hello again! from channel music
  console.log("Receive message %s from channel %s", message, channel);
});

// There's also an event called 'messageBuffer', which is the same as 'message' except
// it returns buffers instead of strings.
redis.on("messageBuffer", function(channel, message) {
  // Both `channel` and `message` are buffers.
});

app.use(cors())

app.get('/boss/location', (req, res) => {
  pub.publish("news", "Hello world!");
  pub.publish("music", "Hello again!");
  axios({
    method: 'get',
    url: process.env.BOSS_SERVICE_URL + 'location',
    responseType: 'stream'
  })
    .then(function (response) {
      // handle success
      response.data.pipe(res)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(500, 'error')
    });
})
app.get('/deadlines/numberofmissed', (req, res) => {
  axios({
    method: 'get',
    url: process.env.DEADLINES_SERVICE_URL + 'deadlines/numberofmissed',
    responseType: 'stream'
  })
    .then(function (response) {
      // handle success
      response.data.pipe(res)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(500, 'error')
    });
})
app.get('/meetings/timetonextmeeting', (req, res) => {
  axios({
    method: 'get',
    url: process.env.MEETINGS_SERVICE_URL + 'timetonextmeeting',
    responseType: 'stream'
  })
    .then(function (response) {
      // handle success
      response.data.pipe(res)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(500, 'error')
    });
})


app.listen(port, () => console.log(`API Gateway listening on port ${port}!`))