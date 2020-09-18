const { Structures } = require('discord.js');

module.exports = Structures.extend('Guild', (Guild) => {

  class RinTGuild extends Guild {
    /**
     * Translate data fetch
     * @param {string} key - Path to statement
     * @param {Object} [args] - Data to fill in blocks
     * @returns {string}
     */
    language(key, args) {
      const language = this.client.translations.get(this.data.language);
      if (!language) throw 'Message: Invalid language set in data.';
      return language(key, args);
    }
  }

  return RinTGuild;
});
