const { User } = require('../database/models');
const tokenService = require('../services/tokenService');
const errorHelper = require('../helpers/errorHelper');

function AuthController() { }

AuthController.authenticate = async (req, res, next) => {
  const { authToken, number } = req.body;
  try {
    if (authToken !== process.env.GUI_AUTH_TOKEN) {
      errorHelper.throwError('Authentication failed', 401);
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
