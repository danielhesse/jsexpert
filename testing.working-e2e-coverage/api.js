const http = require('http')

const DEFAULT_USER = { username: 'Daniel Hessel', password: '123' }

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact us page')
    return response.end()
  },

  '/login:post': async (request, response) => {
    // response é um iterator
    for await (const data of request) {

      /**
       * JSON.parse(data) para tranformar em json, pois o data é um Buffer, é
       * um tipo de string, ele vem com um array de bytes
       */
      const user = JSON.parse(data)

      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401)
        response.write('Logging failed!')
        return response.end()
      }

      response.write('Logging has succeeded!')
      return response.end()
    }
  },

  default: (request, response) => {
    response.write('Hello World')
    return response.end();
  }
}

const handler = function (request, response) {
  const { url, method } = request
  const routeKey = `${url}:${method.toLowerCase()}`

  const chosen = routes[routeKey] || routes.default

  response.writeHead(200, {
    'Content-Type': 'text/html'
  })

  return chosen(request, response)
}

const app = http.createServer(handler).listen(3333, () => {
  console.log('App running at', 3333)
})

module.exports = app
