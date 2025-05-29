const express = require('express');
const router = express.Router();
const authMW = require('../../middleware/auth.mw');
const RoleController = require('../../controller/role.controller');
const permission_mw = require('../../middleware/permission.mw');
const { PERMISSIONS } = require('../../config/contants');
router.get(
  '/',
  authMW,
  permission_mw(PERMISSIONS.READ_ROLES),
  RoleController.listRoles
);
router.post(
  '/',
  authMW,
  permission_mw(PERMISSIONS.WRITE_ROLES),
  RoleController.createRole
);
router.put(
  '/:id',
  authMW,
  permission_mw(PERMISSIONS.WRITE_ROLES),
  RoleController.updateRole
);
router.delete(
  '/:id',
  authMW,
  permission_mw(PERMISSIONS.DELETE_ROLES),
  RoleController.deleteRole
);
router.get(
  '/:id',
  authMW,
  permission_mw(PERMISSIONS.READ_ROLES),
  RoleController.getRoleById
);

module.exports = router;
