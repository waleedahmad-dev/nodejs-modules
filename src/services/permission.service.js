const { PERMISSIONS_ARRAY } = require('../config/contants');
module.exports = {
  searchPermission: (permissionName) => {
    if (permissionName) {
      const permissions = PERMISSIONS_ARRAY.filter((permission) =>
        permission.toLowerCase().includes(permissionName.toLowerCase())
      );
      return permissions.length > 0 ? permissions : null;
    }
    return PERMISSIONS_ARRAY;
  },
};
