const command = require('../../structures/BaseCommand.js');

module.exports = class Configs extends command {
  constructor(client) {
    super(client, 'configs', {
      aliases: ['cs'],
      clientPermissions: ['EMBED_LINKS'],
      usage: 'configs [subcommand]'
    });
  }

  run(client, message, [sub]) {
    if (!sub) return;
    switch (sub) {
    case 'see': {
      break;
    }
    default: {
      return;
    }
    }
  }
};
