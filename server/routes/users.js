const { Router } = require('express');
const UserController = require('../controllers/UserController');
const middleware = require('../middleware');

const { authenticateUser } = middleware;
const {
  getContactList, getContactMessages, getUser, updateUser
} = UserController;

const router = Router();

router.get('/users', authenticateUser, getContactList);
router.get('/users/:id', authenticateUser, getUser);
router.put('/users/:id', authenticateUser, updateUser);
router.get('/users/:id/messages', authenticateUser, getContactMessages);

module.exports = router;
