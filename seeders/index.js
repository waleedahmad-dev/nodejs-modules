/* eslint-disable no-undef */
const database = require('../src/config/database');
const permissionSeed = require('./permission.seed');
const roleSeed = require('./role.seed');
const userSeed = require('./user.seed');
database()
  .then(async () => {
    await permissionSeed();
    await roleSeed();
    await userSeed();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  })
  .finally(() => {
    process.exit(0);
  });
