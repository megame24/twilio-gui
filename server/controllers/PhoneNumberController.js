/**
 * NumberController constructor
 * @returns {undefined}
 */
function NumberController() { }

/**
 * Get available phone numbers from the .env file
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
NumberController.getAvailableNumbers = async (req, res) => {
  const availableNumbers = process.env.AVAILABLE_PHONE_NUMBERS.split(',');
  res.status(200).json({ availableNumbers });
};

module.exports = NumberController;
