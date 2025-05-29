/**
 * Permission middleware for Express.js
 * Usage: app.use('/route', permissionMiddleware(['PERMISSION_1', 'PERMISSION_2']))
 */

module.exports = (...requiredPermissions) => {
  return (req, res, next) => {
    // Assume user permissions are attached to req.user.role.permissions as an array
    const userPermissions =
      req.user && Array.isArray(req.user.role.permissions)
        ? req.user.role.permissions
        : [];

    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.includes(perm)
    );

    if (!hasPermission) {
      return res
        .status(403)
        .json({ message: 'Forbidden: insufficient permissions' });
    }

    next();
  };
};
