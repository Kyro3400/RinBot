const command = require('../../structures/BaseCommand.js');

module.exports = class Prefix extends command {
  constructor() {
    super('prefix', {
      usage: 'prefix <newPrefix>',
      aliases: [],
      category: 'misc',
      description: 'Set a custom prefix for your server.',
      clientPermissions: ['EMBED_LINKS'],
      memberPermissions: ['MANAGE_GUILD'],
      guildOnly: true,
    });
  }

  async run(client, message, args) {

  }
};
