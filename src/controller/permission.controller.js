const { searchPermission } = require('../services/permission.service');

module.exports = {
  listPermissions: async (req, res) => {
    try {
      const { search } = req.query;

      const permissions = searchPermission(search);
      return res.status(200).json({ permissions });
    } catch (error) {
      console.error('Error fetching permissions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
