module.exports = {
  name: 'ping',
  aliases: [],
  usage: 'ping',
  category: 'general',
  description: 'Latency from the bot to server',
  cooldown: 3,
  clientPermissions: ['none'],
  run: async (client, message) => {
    const startTime = Date.now();
    await message.channel.send('Pinging...').then(async(m) => {
      const endTime = Date.now();
      await (m.edit(`Pong! \`${endTime - startTime}ms\``));
    });
  }
};