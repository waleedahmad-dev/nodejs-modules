const cors = require('cors');

module.exports = () =>
  cors({
    origin: '*', // Allow all origins
    methods: ['', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    maxAge: 3600, // Cache preflight response for 1 hour
  });
