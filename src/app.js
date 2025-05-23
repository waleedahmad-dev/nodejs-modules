const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const database = require('./config/database');
const cors = require('./plugins/cors');
const rateLimit = require('./plugins/rate-limiter');
const app = express();
const path = require('path');
const routesV1 = require('./routes/v1.routes');
const welcome = require('./routes/welcome.routes');
// start database connection
database();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Rate limiting
app.use(rateLimit);
// Logging
app.use(morgan('dev'));
// Serve static files
// eslint-disable-next-line no-undef
app.use('/static', express.static(path.join(__dirname, '../uploads')));
// Routes
app.use('/api/v1', routesV1);
app.use('/', welcome);
// export app

module.exports = app;
