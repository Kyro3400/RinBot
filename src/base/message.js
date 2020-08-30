const { Structures } = require('discord.js');

module.exports = Structures.extend('Message', (Message) => {

  class RinMessage extends Message {
    constructor(client, data, channel) {
      super(client, data, channel);

      // console.log(data);
    }
  }

  return RinMessage;
});