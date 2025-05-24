const Permission = require('../src/models/permissions.model');
const { PERMISSIONS_ARRAY } = require('../src/config/contants');

module.exports = async () => {
  try {
    for (const permissionName of PERMISSIONS_ARRAY) {
      const exists = await Permission.findOne({ name: permissionName });
      if (!exists) {
        const permission = new Permission({ name: permissionName });
        await permission.save();
        console.log(`Permission "${permissionName}" seeded`);
      } else {
        console.log(`Permission "${permissionName}" already exists`);
      }
    }
    console.log('Permission seeding completed');
  } catch (error) {
    console.error('Error seeding permissions:', error);
  }
};
