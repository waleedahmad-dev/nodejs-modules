const joi = require('joi');

const authValidationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
});

const signUpValidationSchema = joi.object({
  user_name: joi.string().min(2).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
  role: joi.string().required(),
});

const forgotPasswordValidationSchema = joi.object({
  email: joi.string().email().required(),
});

const resetPasswordValidationSchema = joi.object({
  newPassword: joi.string().min(6).max(20).required(),
});

module.exports = {
  validateLogin: (user) => {
    const { error } = authValidationSchema.validate(user);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },
  validateSignUp: (user) => {
    const { error } = signUpValidationSchema.validate(user);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },
  validateForgotPassword: (user) => {
    const { error } = forgotPasswordValidationSchema.validate(user);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },
  validateResetPassword: (user) => {
    const { error } = resetPasswordValidationSchema.validate(user);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },
};
