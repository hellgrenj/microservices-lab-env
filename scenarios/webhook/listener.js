const express = require('express')
const chalk = require('chalk')
const EventEmitter = require('events')
const webhookServer = express()
const port = 3434
webhookServer.get('/', (req, res) => res.send(`up and running at port ${port}`))

const listener = {}
listener.events = new EventEmitter();
webhookServer.get('/system-up', (req, res) => {
    listener.events.emit('system-up')
    res.send('thanks for the heads up')
});
listener.init = function () {
    return new Promise(resolve => {
        webhookServer.listen(port, () => {
            console.log(chalk.yellow(`webhook listener running on port ${port}!`))
            resolve()
        })
    })
}
module.exports = listener