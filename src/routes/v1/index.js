const express = require('express');
const authRoutes = require('./auth.routes');
const permissionRoutes = require('./permission.routes');
const roleRoutes = require('./role.routes');
const userRoutes = require('./user.routes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/permissions', permissionRoutes);
router.use('/roles', roleRoutes);
router.use('/users', userRoutes);

module.exports = router;
