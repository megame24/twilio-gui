const twilio = require('twilio');
const { User, Contact, Message, ReadTime } = require('../database/models');
const activeContact = require('../repositories/ActiveContact');
const twilioService = require('../services/twilio');
const clientsList = require('../repositories/ClientsList');

const twilioAccountSid = process.env.TWILIO_ACCOUND_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(twilioAccountSid, twilioAuthToken);

function MessageController() { }

MessageController.sendMessageToNewContact = async (req, res, next) => {
  const { owner} = req.body;
  let { number, message: body } = req.body;
  number = number.trim();
  body = body.trim();
  try {
    // create user and save the contact if it doesn't already exist
    const findOrCreateUserRes = await User.findOrCreate({
      where: { number }
    });
    const user = findOrCreateUserRes[0].dataValues;
    const createContactResponse = await Contact.findOrCreate({
      where: {
        ownerId: owner.id,
        contactId: user.id
      }
    });
    // initialize readTime
    const isContactCreated = createContactResponse[1];
    if (isContactCreated) {
      await ReadTime.findOrCreate({
        where: { userId: user.id }, defaults: { readTime: new Date() }
      });
    }
    // send the message to twilio
    await twilioService.sendMessage(client, body, number, owner.number);

    // save the message
    await Message.create({
      body,
      toId: user.id,
      fromId: owner.id
    });
    res.status(201)
      .json({ message: 'Message sent successfully', contact: user });
  } catch (err) {
    next(err);
  }
};

MessageController.sendMessageToOldContact = async (req, res, next) => {
  const { contactId, owner } = req.body;
  let { message: body } = req.body;
  body = body.trim();
  try {
    const contact = await User.findById(contactId);
    const number = contact.dataValues.number;
    // send the message to twilio
    await twilioService.sendMessage(client, body, number, owner.number);

    // save the message
    await Message.create({
      body,
      toId: contactId,
      fromId: owner.id
    });
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    next(err);
  }
};

MessageController.receiveMessage = async (req, res, next) => {
  const {
    From: number, Body: body, To: ownerNumber, MediaUrl0: media
  } = req.body;
  try {
    const findOwnerResponse = await User.findOne({ where: {
      number: ownerNumber,
    }});
    const ownerId = findOwnerResponse.dataValues.id;
    const findOrCreateUserRes = await User.findOrCreate({
      where: { number }
    });
    const contactId = findOrCreateUserRes[0].dataValues.id;
    // save contact if necessary
    const createContactResponse = await Contact.findOrCreate({
      where: {
        ownerId,
        contactId: contactId
      }
    });
    const isContactCreated = createContactResponse[1];
    if (isContactCreated) {
      await ReadTime.findOrCreate({
        where: { userId: contactId }, defaults: { readTime: new Date() }
      });
    }
    const message = await Message.create({
      body,
      media,
      toId: ownerId,
      fromId: contactId,
    });
    // check if the sender is active on the front-end ...
    // via socket, if it is, update the readTime for that contact
    if (contactId === activeContact.get(ownerId)) {
      const readTimeResponse = await ReadTime.findOrCreate({
        where: { userId: contactId }, defaults: { readTime: new Date() }
      });
      const isReadTimeCreated = readTimeResponse[1];
      if (!isReadTimeCreated) {
        await ReadTime.update({
          readTime: new Date()
        }, { where: { userId: contactId } });
      }
    }
    if (clientsList.clients[ownerId]) {
      // loop through the socket ids and emit the message to
      // the clients corresponding to those socket ids
      clientsList.clients[ownerId].forEach((clientSocket) => {
        global.io.sockets.connected[clientSocket].emit('new message', message);
      });
    }
    // respond to twilio with empty body
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(`<?xml version="1.0" encoding="UTF-8"?>
      <Response></Response>`);
  } catch (err) {
    next(err);
  }
};

module.exports = MessageController;
