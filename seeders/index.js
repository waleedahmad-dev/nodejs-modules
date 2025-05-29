/* eslint-disable no-undef */
const database = require('../src/config/database');
const roleSeed = require('./role.seed');
const userSeed = require('./user.seed');
database()
  .then(async () => {
    await roleSeed();
    await userSeed();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  })
  .finally(() => {
    process.exit(0);
  });
