const { Router } = require('express');
const NumberController = require('../controllers/PhoneNumberController');

const {
  getAvailableNumbers
} = NumberController;

const router = Router();

router.get('/phoneNumbers', getAvailableNumbers);

module.exports = router;
