const cryptoService = require('../services/crypto.service');
const userServices = require('../services/user.service');
const emailService = require('../services/email.service');
const config = require('../config');

module.exports = {
  registerUser: async (userData) => {
    console.log('userData', userData);
    const { email, password } = userData;
    const existingUser = await userServices.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const salt = await cryptoService.hashPassword();
    const hashedPassword = await cryptoService.hashPasswordWithSalt(
      password,
      salt
    );
    const newUser = await userServices.createUser({
      ...userData,
      password: hashedPassword,
      salt,
    });

    return newUser;
  },
  loginUser: async (email, password) => {
    const user = await userServices.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await cryptoService.comparePassword(
      password,
      user.password
    );
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    const token = cryptoService.generateToken(user);
    return { user, token };
  },
  forgotPassword: async (email) => {
    const user = await userServices.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const token = cryptoService.generateForgotPasswordToken(user);
    console.log('token', token);
    const { FRONTEND_URL } = config.frontend_origin;
    const link = `${FRONTEND_URL}/reset-password/${token}`;
    // Send email with the link
    await emailService.sendForgotPasswordEmail(email, link, user.name);
    return {
      message: 'Password reset email sent successfully',
      status: true,
    };
  },
  resetPassword: async (user, newPassword) => {
    const { id } = user;
    const existingUser = await userServices.findUserById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const salt = await cryptoService.hashPassword();
    const hashedPassword = await cryptoService.hashPasswordWithSalt(
      newPassword,
      salt
    );
    await userServices.updateUserPassword(id, hashedPassword, salt);
    return {
      message: 'Password reset successfully',
      status: true,
    };
  },
};
