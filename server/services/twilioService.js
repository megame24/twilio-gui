const sendMessage = (client, message, to, from) => {
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
