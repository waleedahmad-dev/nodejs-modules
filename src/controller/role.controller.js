const roleService = require('../services/role.service');
const roleValidation = require('../validation/roles.validation');

module.exports = {
  createRole: async (req, res) => {
    try {
      const roleData = req.body;
      roleValidation.validateCreateRole(roleData);

      const role = await roleService.createRole(roleData);
      res.status(201).json({ message: 'Role created successfully', role });
    } catch (error) {
      console.error('Error creating role:', error);
      res.status(400).json({ error: error.message });
    }
  },
  listRoles: async (req, res) => {
    try {
      const { search, limit, page } = req.query;
      const roles = await roleService.listRoles(
        search,
        parseInt(limit),
        parseInt(page)
      );
      res.status(200).json(roles);
    } catch (error) {
      console.error('Error listing roles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getRoleById: async (req, res) => {
    try {
      const roleId = req.params.id;
      const role = await roleService.getRoleById(roleId);
      res.status(200).json(role);
    } catch (error) {
      console.error('Error fetching role:', error);
      res.status(404).json({ error: 'Role not found' });
    }
  },
  updateRole: async (req, res) => {
    try {
      const roleId = req.params.id;
      const roleData = req.body;
      roleValidation.validateUpdateRole(roleData);

      const updatedRole = await roleService.updateRole(roleId, roleData);
      res
        .status(200)
        .json({ message: 'Role updated successfully', updatedRole });
    } catch (error) {
      console.error('Error updating role:', error);
      res.status(400).json({ error: error.message });
    }
  },
  deleteRole: async (req, res) => {
    try {
      const roleId = req.params.id;
      await roleService.deleteRole(roleId);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      console.error('Error deleting role:', error);
      res.status(404).json({ error: error.message });
    }
  },
};
