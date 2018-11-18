const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const {
  authenticate
} = AuthController;

const router = Router();

router.post('/auth', authenticate);

module.exports = router;
