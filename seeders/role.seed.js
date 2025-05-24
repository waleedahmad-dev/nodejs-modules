const Role = require('../src/models/roles.model');
const { USER_ROLES } = require('../src/config/contants');
const Permission = require('../src/models/permissions.model');

module.exports = async () => {
  try {
    for (const roleName of Object.values(USER_ROLES)) {
      const exists = await Role.findOne({ name: roleName });
      if (!exists) {
        const role = new Role({ name: roleName });
        await role.save();
        console.log(`Role "${roleName}" seeded`);
        const permissions = await Permission.find();
        const permissionIds = permissions.map((permission) => permission._id);
        role.permissions = permissionIds;
        await role.save();
        console.log(`Permissions assigned to role "${roleName}"`);
      } else {
        console.log(`Role "${roleName}" already exists`);
      }
    }
    console.log('Role seeding completed');
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};
