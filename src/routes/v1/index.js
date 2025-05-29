const express = require('express');
const authRoutes = require('./auth.routes');
const permissionRoutes = require('./permission.routes');
const roleRoutes = require('./role.routes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/permissions', permissionRoutes);
router.use('/roles', roleRoutes);

module.exports = router;
