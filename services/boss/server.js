const express = require('express')
const app = express()
const port = 3000

const locationService = require('./services/location')

app.get('/', (req, res) => res.send('up and running'))

app.get('/location', async (req, res) => { 
    const location = await locationService.get()
    res.send(location) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))