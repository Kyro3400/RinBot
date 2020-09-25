const { MessageEmbed } = require('discord.js');
const command = require('../../structures/BaseCommand.js');

module.exports = class Avatar extends command {
  constructor() {
    super('avatar', {
      aliases: ['av'],
      usage: 'avatar <user>',
      category: 'misc',
      description: 'Get a user profile picture',
      clientPermissions: ['EMBED_LINKS'],
      guildOnly: true,
    });
  }

  async run(client, message, [member]) {
    if (!member) {
      const noArgse = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RANDOM')
        .setTitle('**Avatar**')
        .setImage(message.author.displayAvatarURL({ dynamic: true, size: 1024 }));
      try {
        await message.channel.send(noArgse);
      } catch (e) {
        message.channel.send(`error: \`${e}\``);
      }
      return;
    }

    const userAvatar = message.mentions.users.first() || await message.guild.members.cache.get(member).user;
    if (!userAvatar) {
      const notfound = new MessageEmbed()
        .setDescription('❌ Couldn\'t find that user.')
        .setColor('#c90000');
      return (await message.channel.send(notfound));
    }
    const embed = new MessageEmbed()
      .setAuthor(userAvatar.tag, userAvatar.displayAvatarURL(), userAvatar.displayAvatarURL())
      .setColor('RANDOM')
      .setTitle('**Avatar**')
      .setImage(userAvatar.displayAvatarURL({ dynamic: true, size: 1024 }));
    return (await message.channel.send(embed));
  }
};
