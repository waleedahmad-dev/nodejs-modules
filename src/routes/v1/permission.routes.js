const express = require('express');

const router = express.Router();
const authMW = require('../../middleware/auth.mw');
const PermissionController = require('../../controller/permission.controller');
const permission_mw = require('../../middleware/permission.mw');
const { PERMISSIONS } = require('../../config/contants');

router.get(
  '/',
  authMW,
  permission_mw(PERMISSIONS.READ_PERMISSIONS),
  PermissionController.listPermissions
);

module.exports = router;
