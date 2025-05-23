const cryptoService = require("../services/crypto.service");
const userServices = require("../services/user.service");
const emailService = require("../services/email.service");
module.exports = {
  registerUser: async (userData) => {
    try {
      const { email, password } = userData;
      const existingUser = await userServices.findUserByEmail(email);
      if (existingUser) {
        throw new Error("User already exists");
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
    } catch (error) {
      throw error;
    }
  },
  loginUser: async (email, password) => {
    try {
      const user = await userServices.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await cryptoService.comparePassword(
        password,
        user.password
      );
      if (!isMatch) {
        throw new Error("Invalid password");
      }
      const token = cryptoService.generateToken(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (email) => {
    try {
      const user = await userServices.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      const token = cryptoService.generateToken(user, "1h");
      const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;
      // Send email with the link
      await emailService.sendForgotPasswordEmail(email, link, user.name);
      return {
        message: "Password reset email sent successfully",
        status: true,
      };
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (user, newPassword) => {
    try {
      const { id } = user;
      const existingUser = await userServices.findUserById(id);
      if (!existingUser) {
        throw new Error("User not found");
      }
      const salt = await cryptoService.hashPassword();
      const hashedPassword = await cryptoService.hashPasswordWithSalt(
        newPassword,
        salt
      );
      await userServices.updateUserPassword(id, hashedPassword, salt);
      return {
        message: "Password reset successfully",
        status: true,
      };
    } catch (error) {
      throw error;
    }
  },
};
