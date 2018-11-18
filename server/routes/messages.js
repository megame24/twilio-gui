const { Router } = require('express');
const MessageController = require('../controllers/MessageController');
const middleware = require('../middleware');

const {
  authenticateUser, validateOldContactMessage, validateNewContactMessage
} = middleware;
const {
  sendMessageToNewContact, sendMessageToOldContact, receiveMessage
} = MessageController;

const router = Router();

router.post(
  '/messages/new',
  authenticateUser,
  validateNewContactMessage,
  sendMessageToNewContact
);
router.post(
  '/messages/',
  authenticateUser,
  validateOldContactMessage,
  sendMessageToOldContact
);
router.post('/messages/receive', receiveMessage);

module.exports = router;
