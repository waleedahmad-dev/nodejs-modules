const express = require('express');
const authRoutes = require('./auth.routes');
const permissionRoutes = require('./permission.routes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/permissions', permissionRoutes);

module.exports = router;
