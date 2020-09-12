const command = require('../../structures/BaseCommand.js');

module.exports = class SeeSetting extends command {
  constructor(client) {
    super(client, 'view-settings', {
      category: 'settings',
      clientPermissions: ['EMBED_LINKS'],
      memberPermissions: ['ADMINISTRATOR'],
      guildOnly: true,
    });
  }
};
