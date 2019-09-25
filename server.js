const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);

server.use(function (req, res, next) {
  if (req.method === 'POST') {
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request
    req.method = 'GET'
    req.query = req.body
  }
  // Continue to JSON Server router
  next()
})

server.use(jsonServer.rewriter({
  '/tweet/get/all': '/tweets/',
  '/users/get/all': '/users/',
  '/users/get/:id': '/usersById/:id',
  '/auth/signin': '/signin/',
  '/auth/signup': '/signup/',
  '/tweet/get/user/:id': '/tweetsById/:id',
  '/tweet/get/parent/:id': '/comments/:id',
  '/tweet/delete/:id': '/tweetDelete/',
  '/tweet/create': '/errorMessage/',
  '/like/:id': '/errorMessage/'
}))

server.use(router);

server.listen(port, () => {
  console.log('JSON Server is running')
});