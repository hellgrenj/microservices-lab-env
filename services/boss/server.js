const express = require('express')
const app = express()
const port = 3000

const locationService = require('./services/location')

app.get('/', (req, res) => res.send('up and running'))
app.get('/location',  (req, res) => res.send(locationService.getSync()))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))