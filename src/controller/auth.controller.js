const authService = require("../services/auth.service");
const authValidation = require("../validation/auth.validation");
module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { error } = authValidation.validateLogin(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const user = await authService.loginUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  signUp: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const { error } = authValidation.validateSignUp(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const newUser = await authService.registerUser(
        firstName,
        lastName,
        email,
        password
      );

      return res
        .status(201)
        .json({ message: "User created successfully", newUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const { error } = authValidation.validateForgotPassword(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const result = await authService.forgotPassword(email);
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "Password reset link sent" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { newPassword } = req.body;
      const { error } = authValidation.validateResetPassword(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const result = await authService.resetPassword(req.user, newPassword);
      if (!result) {
        return res.status(404).json({ message: "Password Reset Failed" });
      }
      return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
