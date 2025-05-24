const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../config/logger');

const hashPassword = async () => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return salt;
};

const hashPasswordWithSalt = async (password, salt) => {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const generateToken = (user) => {
  const token = Jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt.secret,
    { expiresIn: `${config.jwt.accessExpirationMinutes}m` }
  );
  return token;
};

const generateForgotPasswordToken = (user) => {
  const token = Jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    config.jwt.secret,
    { expiresIn: `${config.jwt.resetPasswordExpirationMinutes}m` }
  );
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = Jwt.verify(token, config.jwt.secret);
    return decoded;
  } catch (error) {
    logger.error('Token verification failed:', error.message);
    return null;
  }
};

module.exports = {
  hashPassword,
  hashPasswordWithSalt,
  comparePassword,
  generateToken,
  verifyToken,
  generateForgotPasswordToken,
};
