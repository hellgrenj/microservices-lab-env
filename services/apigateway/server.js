const express = require('express')
const app = express()
const port = process.env.PORT
const axios = require('axios')
const cors = require('cors')
const Redis = require("ioredis");
const redis = new Redis(6379, "redis");
var pub = new Redis(6379, "redis");


app.use(cors())

app.get('/boss/location', (req, res) => {
  pub.publish("systemevents", "APIGATEWAY > (GET) /boss/location");
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
  pub.publish("systemevents", "APIGATEWAY > (GET) /deadlines/numberofmissed");
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
  pub.publish("systemevents", "APIGATEWAY > (GET) /meetings/timetonextmeeting");
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