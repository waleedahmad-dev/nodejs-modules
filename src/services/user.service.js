const User = require('../models/user.model');

module.exports = {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  },

  async updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  async findUserById(userId) {
    return await User.findById(userId);
  },
  async findUserByIdWithRole(userId) {
    return await User.findById(userId).populate('role');
  },
  async findUserByEmail(email) {
    return await User.findOne({ email })
      .populate('role')
      .populate('role.permissions');
  },

  async findAllUsers({ page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();
    return {
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  },
  async searchUsers(searchString = '', { page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const query = searchString
      ? {
          $or: [
            { name: { $regex: searchString, $options: 'i' } },
            { email: { $regex: searchString, $options: 'i' } },
            // Add more fields here if needed
          ],
        }
      : {};
    const users = await User.find(query).skip(skip).limit(limit);
    const total = await User.countDocuments(query);
    return {
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  },
  async updateUserPassword(id, newPassword, salt) {
    return await User.findByIdAndUpdate(
      id,
      { password: newPassword, salt },
      { new: true }
    );
  },
};
