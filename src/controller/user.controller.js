const userService = require('../services/user.service');
const userValidations = require('../validation/user.validation');

module.exports = {
  createUser: async (req, res) => {
    try {
      userValidations.validateUser(req.body);
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      userValidations.validateUserUpdate(req.body);
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
