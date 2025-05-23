const { default: rateLimit } = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 60, // limit each IP to 60 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: 'Too many requests, please try again later.' },
});
