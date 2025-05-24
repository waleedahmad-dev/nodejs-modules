const { USER_ROLES } = require('../src/config/contants');
const config = require('../src/config');
const User = require('../src/models/user.model');
const Role = require('../src/models/roles.model');
const AuthService = require('../src/services/auth.service');

module.exports = async () => {
  const user_email = config.admin_email;
  try {
    const userExist = await User.findOne({
      email: user_email,
    });
    const userRole = await Role.findOne({
      name: USER_ROLES.ADMIN,
    });
    if (!userExist && userRole) {
      const userData = {
        user_name: user_email,
        email: user_email,
        password: 'Password',
        role: userRole._id,
      };
      await AuthService.registerUser(userData);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
