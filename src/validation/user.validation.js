const joi = require("joi");

const userValidationSchema = joi.object({
  firstName: joi.string().min(2).max(30).required(),
  lastName: joi.string().min(2).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
  role: joi.string().valid("user", "admin").default("user"),
});
const userUpdateValidationSchema = joi.object({
  firstName: joi.string().min(2).max(30),
  lastName: joi.string().min(2).max(30),
  email: joi.string().email(),
  password: joi.string().min(6).max(20),
  role: joi.string().valid("user", "admin").default("user"),
});

module.exports = {
  validateUser: (user) => {
    const { error } = userValidationSchema.validate(user);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },
  validateUserUpdate: (user) => {
    const { error } = userUpdateValidationSchema.validate(user);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },
};
