const { MessageEmbed } = require('discord.js');
const command = require('../../structures/BaseCommand.js');

module.exports = class Avatar extends command {
  constructor(client) {
    super(client, 'avatar', {
      aliases: ['av'],
      usage: 'avatar <user>',
      category: 'misc',
      description: 'Get a user picture',
    });
  }

  async run(client, message, args) {
    if (!args[0]) {
      const { author } = message;
      const noArgse = new MessageEmbed()
        .setAuthor(`${author.tag}`, author.displayAvatarURL())
        .setColor('RANDOM')
        .setTitle('**Avatar**')
        .setImage(`${author.displayAvatarURL({ dynamic: true, size: 1024 })}`);
      try {
        await message.channel.send(noArgse);
      } catch (e) {
        message.channel.send(`error: \`${e}\``);
      }
      return;
    }
    // eslint-disable-next-line no-empty-function
    const userAvatar = message.mentions.users.first() || await client.users.fetch(args.join(' ')).catch(() => {});
    if (!userAvatar) {
      const notfound = new MessageEmbed()
        .setDescription('❌ Couldn\'t find that user.')
        .setColor('#c90000');
      return (await message.channel.send(notfound));
    }
    const embed = new MessageEmbed()
      .setAuthor(`${userAvatar.tag}`, userAvatar.displayAvatarURL(), userAvatar.displayAvatarURL())
      .setColor('RANDOM')
      .setTitle('**Avatar**')
      .setImage(`${userAvatar.displayAvatarURL({ dynamic: true, size: 1024 })}`);
    return (await message.channel.send(embed));
  }
};
