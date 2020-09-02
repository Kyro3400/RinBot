const command = require('../../utils/structures/BaseCommand.js');

module.exports = class Prefix extends command {
  constructor(client) {
    super(client, 'prefix', {
      usage: 'prefix <newPrefix>',
      category: 'misc',
      description: 'Set a custom prefix for your server.',
    });
  }

  async run(client, message, args) {

  }
};
