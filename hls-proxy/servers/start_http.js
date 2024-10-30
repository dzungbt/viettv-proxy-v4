const http = require('http')
const {getStartCommandParams} = require('../../helpers')
const start_server = function({port}) {
  if (!port || isNaN(port)) port = 80

  port = getStartCommandParams('sysport') || port
  const server = http.createServer()

  server.listen(port, function () {
    console.log(`HTTP server is listening on port: ${port}`)
  })

  return server
}

module.exports = start_server
