const sha256 = require('js-sha256').sha256;
const { User } = require('../database/models');
const tokenService = require('../services/tokenService');
const errorHelper = require('../helpers/errorHelper');

function AuthController() { }

AuthController.authenticate = async (req, res, next) => {
  const { password, number } = req.body;
  try {
    const hash = sha256(password);
    if (hash !== process.env.GUI_AUTH_TOKEN.toLowerCase()) {
      errorHelper.throwError('Incorrect password', 401);
    }
    const response = await User.findOrCreate({
      where: { number }
    });
    const { id: ownerId } = response[0].dataValues;
    const token = tokenService.generateToken({ ownerId });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = AuthController;
