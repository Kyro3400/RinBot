const command = require('../../utils/structures/BaseCommand.js');

module.exports = class SeeSetting extends command {
  constructor(client) {
    super(client, 'view-settings', {
      category: 'settings',
    });
  }
};
