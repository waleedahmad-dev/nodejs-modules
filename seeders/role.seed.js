const Role = require('../src/models/roles.model');
const { USER_ROLES, PERMISSIONS_ARRAY } = require('../src/config/contants');

module.exports = async () => {
  try {
    for (const roleName of Object.values(USER_ROLES)) {
      const exists = await Role.findOne({ name: roleName });
      if (!exists) {
        const role = new Role({ name: roleName });
        await role.save();
        console.log(`Role "${roleName}" seeded`);
        const permissions = PERMISSIONS_ARRAY;

        role.permissions = permissions;
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
