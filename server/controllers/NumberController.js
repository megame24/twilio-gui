function NumberController() { }

NumberController.getAvailableNumbers = async (req, res) => {
  const availableNumbers = process.env.AVAILABLE_NUMBERS.split(',');
  res.status(200).json({ availableNumbers });
};

module.exports = NumberController;
