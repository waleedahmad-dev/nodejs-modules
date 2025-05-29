const mongoose = require('mongoose');
const Role = require('./roles.model');

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
      type: mongoose.Schema.Types.ObjectId,
      ref: Role,
      required: true,
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
