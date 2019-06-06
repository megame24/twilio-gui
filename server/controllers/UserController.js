const Sequelize = require('sequelize');
const { User, sequelize, Message } = require('../database/models');
const queryHelper = require('../helpers/queryHelper');
const { throwError } = require('../helpers/errorHelper');

const Op = Sequelize.Op;

/**
 * UserController constructor
 * @returns {undefined}
 */
function UserController() { }

/**
 * Get contact list
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
UserController.getContactList = async (req, res, next) => {
  const { owner } = req.body;
  try {
    const contactList = await sequelize
      .query(queryHelper.getContactListWithNotifn(owner.id), {
        type: sequelize.QueryTypes.SELECT,
      });
    res.status(200).json({ contactList });
  } catch (err) {
    next(err);
  }
};

/**
 * Get a user by id
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
UserController.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (isNaN(Number(id))) {
      throwError('User id can only be an integer', 400);
    }
    const getUserResponse = await User.findById(id);
    if (!getUserResponse) throwError('User not found', 404);
    const user = getUserResponse.dataValues;
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

/**
 * Update a user
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
UserController.updateUser = async (req, res, next) => {
  const { name = '' } = req.body;
  const { id } = req.params;
  const updateField = [];
  if (name.trim()) updateField.push('name');
  try {
    if (isNaN(Number(id))) {
      throwError('User id can only be an integer', 400);
    }
    const updateUserResponse = await User.update(
      { name },
      {
        where: { id },
        returning: true,
        fields: updateField,
      }
    );
    res.status(200).json(updateUserResponse[1]);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all messages belonging to a contact
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
UserController.getContactMessages = async (req, res, next) => {
  const { id: contactId } = req.params;
  let { limit } = req.query;
  const { page } = req.query;
  const { owner } = req.body;
  limit = limit <= 30 ? limit : 30;
  const offset = page > 0 ? ((page - 1) * limit) : 0;
  try {
    if (isNaN(Number(contactId))) {
      throwError('User id can only be an integer', 400);
    }
    const messageResponse = await Message.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'body', 'media', 'createdAt'],
      include: [
        {
          model: User,
          as: 'to',
          attributes: ['id', 'name', 'phoneNumber']
        },
        {
          model: User,
          as: 'from',
          attributes: ['id', 'name', 'phoneNumber']
        },
      ],
      where: {
        [Op.or]: [{
          toId: owner.id,
          fromId: contactId
        },
        {
          toId: contactId,
          fromId: owner.id
        }]
      }
    });
    const messages = messageResponse.map((message) => {
      return message.dataValues;
    });
    res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
};

module.exports = UserController;
