const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request
    req.method = 'GET'
    req.query = req.body
  }
  // Continue to JSON Server router
  next()
})

// Add custom routes before JSON Server router
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
}));

// Use default router
server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running at http://localhost:' + port);
});
