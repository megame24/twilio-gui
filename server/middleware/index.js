const { User } = require('../database/models');
const errorHelper = require('../helpers/errorHelper');
const tokenService = require('../services/tokenService');

const { throwError } = errorHelper;

/**
 * Middleware constructor
 * @returns {undefined}
 */
function Middleware() {}

/**
 * Authenticate user
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Function} next
 */
Middleware.prototype.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  let decoded;
  try {
    if (token) decoded = tokenService.verifyToken(token);
    if (!decoded) {
      errorHelper
        .throwError('Authentication failed', 401);
    }
    const response = await User.findById(decoded.ownerId);
    const owner = response.dataValues;
    req.body.owner = owner;
    return next();
  } catch (err) {
    next(err);
  }
};

/**
 * Validate the message from new contacts
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Function} next
 */
Middleware.prototype.validateNewContactMessage = async (req, res, next) => {
  let { phoneNumber, message } = req.body;
  phoneNumber = phoneNumber && phoneNumber.trim() ? phoneNumber : null;
  message = message && message.trim() ? message : null;
  try {
    if (!phoneNumber) throwError('phone number is required', 400);
    if (isNaN(Number(phoneNumber))) {
      throwError('phone number must be an integer', 400);
    }
    if (!message) throwError('message is required', 400);
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Validate the message from old contacts
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Function} next
 */
Middleware.prototype.validateOldContactMessage = async (req, res, next) => {
  let { message } = req.body;
  message = message && message.trim() ? message : null;
  try {
    if (!message) throwError('message is required', 400);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = new Middleware();
