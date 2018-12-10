const { User } = require('../database/models');
const errorHelper = require('../helpers/errorHelper');
const tokenService = require('../services/tokenService');

const { throwError } = errorHelper;

function Middleware() {}

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

Middleware.prototype.validateNewContactMessage = async (req, res, next) => {
  let { number, message } = req.body;
  number = number && number.trim() ? number : null;
  message = message && message.trim() ? message : null;
  try {
    if (!number) throwError('number is required', 400);
    if (isNaN(Number(number))) {
      throwError('number must be an integer', 400);
    }
    if (!message) throwError('message is required', 400);
    next();
  } catch (err) {
    next(err);
  }
};


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
