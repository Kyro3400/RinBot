const { Structures } = require('discord.js');

module.exports = Structures.extend('Message', (Message) => {

  class RinMessage extends Message {
    translate(key, args) {
      const language = this.client.translations.get(this.guild ? this.guild.data.language : 'en-US');
      if (!language) throw 'Message: Invalid language set in data.';
      return language(key, args);
    }

    send(key, args, options = {}) {
      let string = this.translate(key, args);
      if (options.prefixEmoji) {
        string = `${this.client.botEmojis[options.emoji]} | ${string}`;
      }
      if (options.edit) {
        return this.edit(string);
      } else {
        return this.channel.send(string);
      }
    }
  }

  return RinMessage;
});