const express = require('express');
const userController = require('../../controller/user.controller');
const router = express.Router();
const authMW = require('../../middleware/auth.mw');
const permissionsMW = require('../../middleware/permission.mw');
const { PERMISSIONS } = require('../../config/contants');
//List all users
router.get(
  '/',
  authMW,
  permissionsMW(PERMISSIONS.READ_USERS),
  userController.getAllUsers
);
// Create a new user
router.post(
  '/',
  authMW,
  permissionsMW(PERMISSIONS.WRITE_USERS),
  userController.createUser
);
// Get a user by ID
router.get(
  '/:id',
  authMW,
  permissionsMW(PERMISSIONS.READ_USERS),
  userController.getUserById
);
// Update a user by ID
router.put(
  '/:id',
  authMW,
  permissionsMW(PERMISSIONS.WRITE_USERS),
  userController.updateUser
);
// Delete a user by ID
router.delete(
  '/:id',
  authMW,
  permissionsMW(PERMISSIONS.DELETE_USERS),
  userController.deleteUser
);
// Export the router
module.exports = router;
