const express = require('express')
const app = express()
const port = process.env.PORT
const axios = require('axios')
const cors = require('cors')

app.use(cors())

app.get('/location', (req, res) => {
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

app.listen(port, () => console.log(`API Gateway listening on port ${port}!`))