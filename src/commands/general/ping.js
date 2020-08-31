const command = require('../../utils/structures/BaseCommand.js');

module.exports = class Ping extends command {
  constructor(client) {
    super(client, 'ping', {
      aliases: [],
      usage: 'ping',
      category: 'general',
      description: 'Latency from the bot to server',
      cooldown: 3,
    });
  }

  async run(client, message) {
    const startTime = Date.now();
    await message.channel.send('Pinging...').then(async (m) => {
      const endTime = Date.now();
      await (m.edit(`Pong! \`${endTime - startTime}ms\``));
    });
  }
};
