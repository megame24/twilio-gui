const { Router } = require('express');
const NumberController = require('../controllers/NumberController');

const {
  getAvailableNumbers
} = NumberController;

const router = Router();

router.get('/numbers', getAvailableNumbers);

module.exports = router;
