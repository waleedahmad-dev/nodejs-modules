const Joi = require('joi');

const roleValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(255).optional(),
  permissions: Joi.array().items(Joi.string().required()).min(1).required(),
});

const updateRoleValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  description: Joi.string().max(255).optional(),
  permissions: Joi.array().items(Joi.string().required()).min(1).optional(),
});

module.exports = {
  validateCreateRole: (roleData) => {
    console.log(roleData.name);
    const { error } = roleValidationSchema.validate(roleData);

    if (error) {
      throw new Error(error.details[0].message);
    }
  },

  validateUpdateRole: (roleData) => {
    const { error } = updateRoleValidationSchema.validate(roleData);
    if (error) {
      throw new Error(error.details[0].message);
    }
  },
};
