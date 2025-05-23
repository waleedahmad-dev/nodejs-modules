const app = require('./src/app');
const http = require('http');
const server = http.createServer(app);
const config = require('./src/config');

// Start the server
server.listen(config.port, () => {
  console.log(`Server is running on port http://localhost:${config.port}`);
});
