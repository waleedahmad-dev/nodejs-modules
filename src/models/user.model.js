const mongoose = require('mongoose');
const { USER_ROLES_ARRAY, USER_ROLES } = require('../config/contants');

const user = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLES_ARRAY,
      default: USER_ROLES.USER,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', user, 'users');

module.exports = User;
