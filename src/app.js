const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const database = require('./config/database');
const cors = require('./plugins/cors');
const rateLimit = require('./plugins/rate-limiter');
const app = express();
const path = require('path');
const logger = require('./config/logger');
const routesV1 = require('./routes/v1/');
const welcome = require('./routes/welcome.routes');
// start database connection
database();
// Set up global error handler
app.use((req, res, next, err) => {
  logger.error(`Global Error Handler: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error' });
});
console.log = (...args) => logger.info(args.join(' '));
console.error = (...args) => logger.error(args.join(' '));
console.warn = (...args) => logger.warn(args.join(' '));
// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Rate limiting
app.use(rateLimit);
// Logging
app.use(morgan('combined', { stream: logger.stream }));
// Serve static files
// eslint-disable-next-line no-undef
app.use('/static', express.static(path.join(__dirname, '../uploads')));
// Routes
app.use('/api/v1', routesV1);
app.use('/', welcome);
// export app

module.exports = app;
