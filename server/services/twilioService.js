/**
 * Send message to a specified number
 * @param {Object} client Twilio Client
 * @param {String} message Message to be sent
 * @param {String} to phone number to be messaged
 * @param {String} from phone number sending the message
 * @returns {null} null
 */
const sendMessage = (client, message, to, from) => {
  if (process.env.NODE_ENV === 'test') return;
  return client.messages
    .create({
      body: message,
      from,
      to
    });
};

module.exports = {
  sendMessage,
};
