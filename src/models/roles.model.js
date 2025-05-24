const mongoose = require('mongoose');
const Permission = require('./permissions.model');
const roles = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Permission,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Role = mongoose.model('Role', roles, 'roles');
module.exports = Role;
