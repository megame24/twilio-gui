const { Router } = require('express');
const users = require('./users');
const messages = require('./messages');
const auth = require('./auth');
const phoneNumbers = require('./phoneNumbers');

const router = Router();
router.use('/api', users);
router.use('/api', messages);
router.use('/api', auth);
router.use('/api', phoneNumbers);

module.exports = router;
