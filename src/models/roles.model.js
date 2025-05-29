const mongoose = require('mongoose');

const roles = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Role = mongoose.model('Role', roles, 'roles');
module.exports = Role;
