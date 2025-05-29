const Role = require('../models/roles.model');
const { USER_ROLES, PERMISSIONS_ARRAY } = require('../config/contants');

module.exports = {
  async createRole({ name, permissions = [] }) {
    try {
      const existingRole = await Role.findOne({ name: name });
      if (existingRole) {
        console.log(`Role "${name}" already exists`);
        throw new Error('Role already exists');
      }
      // check all permissions are valid
      const invalidPermissions = permissions.filter(
        (perm) => !PERMISSIONS_ARRAY.includes(perm)
      );
      if (invalidPermissions.length > 0) {
        console.error(
          `Invalid permissions for role "${name}": ${invalidPermissions.join(', ')}`
        );
        throw new Error('Invalid permissions provided');
      }
      const role = new Role({
        name: name,
        permissions: permissions,
      });
      console.log('Role creation completed');
      return await role.save();
    } catch (error) {
      console.error('Error creating roles:', error);
      throw error;
    }
  },
  async listRoles(search, limit = 10, page = 1) {
    try {
      const query = search ? { name: { $regex: search, $options: 'i' } } : {};
      const options = {
        limit: limit,
        skip: (page - 1) * limit,
        sort: { createdAt: -1 },
        where: {
          name: { $ne: USER_ROLES.ADMIN }, // Exclude admin role
        },
      };
      const roles = await Role.find(query, null, options);
      const totalCount = await Role.countDocuments(query);
      return {
        roles,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error('Error listing roles:', error);
      throw error;
    }
  },
  async getRoleById(roleId) {
    try {
      const role = await Role.findById(roleId);
      if (!role) {
        console.error(`Role with ID ${roleId} not found`);
        throw new Error('Role not found');
      }
      return role;
    } catch (error) {
      console.error('Error fetching role by ID:', error);
      throw error;
    }
  },
  async updateRole(roleId, updates) {
    try {
      const existRole = await this.getRoleById(roleId);
      if (!existRole) {
        console.error(`Role with ID ${roleId} not found`);
        throw new Error('Role not found');
      }
      // Validate permissions if provided
      if (updates.permissions) {
        const invalidPermissions = updates.permissions.filter(
          (perm) => !PERMISSIONS_ARRAY.includes(perm)
        );
        if (invalidPermissions.length > 0) {
          console.error(
            `Invalid permissions for role update: ${invalidPermissions.join(', ')}`
          );
          throw new Error('Invalid permissions provided');
        }
      }
      // Ensure role name is not empty
      if (updates.role_name && updates.role_name.trim() === '') {
        console.error('Role name cannot be empty');
        throw new Error('Role name cannot be empty');
      }
      const role = await Role.findByIdAndUpdate(roleId, updates, {
        new: true,
        runValidators: true,
      });

      return role;
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  },
  async deleteRole(roleId) {
    try {
      const role = await this.getRoleById(roleId);
      if (!role) {
        throw new Error('Role not found');
      }
      if (role.name === USER_ROLES.ADMIN) {
        throw new Error('Unable to delete admin role');
      }
      return role;
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  },
};
