const sha256 = require('js-sha256').sha256;
const { User } = require('../database/models');
const tokenService = require('../services/tokenService');
const errorHelper = require('../helpers/errorHelper');

/**
 * AuthController constructor
 * @returns {undefined}
 */
function AuthController() { }

/**
 * Authentication controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
AuthController.authenticate = async (req, res, next) => {
  const { password, phoneNumber } = req.body;
  try {
    const hash = sha256(password);
    if (hash !== process.env.AUTH_HASH.toLowerCase()) {
      errorHelper.throwError('Incorrect password', 401);
    }
    const response = await User.findOrCreate({
      where: { phoneNumber }
    });
    const { id: ownerId } = response[0].dataValues;
    const token = tokenService.generateToken({ ownerId });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = AuthController;
