const UserService = require('../services/user.service');
const cryptoService = require('../services/crypto.service');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const payload = cryptoService.verifyToken(token);
    if (!payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await UserService.findUserByIdWithRole(payload.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
    // eslint-disable-next-line no-unused-vars
  } catch (_err) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
