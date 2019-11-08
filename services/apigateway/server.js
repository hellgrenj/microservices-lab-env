const http = require('http')
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer({})
const server = http.createServer(function (req, res) {
  console.log('apigateway received a request')
  proxy.web(req, res, { target: process.env.BOSS_SERVICE_URL })
})
console.log(`apigateway listening on port ${process.env.PORT}`)
server.listen(process.env.PORT)
