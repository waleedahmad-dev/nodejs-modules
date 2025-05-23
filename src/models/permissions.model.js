const mongoose = require('mongoose');
const { PERMISSIONS_ARRAY } = require('../config/contants');
const permission = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: PERMISSIONS_ARRAY,
    },
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model('Permission', permission, 'permissions');

module.exports = Permission;
