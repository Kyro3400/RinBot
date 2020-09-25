const { MessageEmbed } = require('discord.js');
const command = require('../../structures/BaseCommand.js');

module.exports = class Configs extends command {
  constructor() {
    super('configs', {
      aliases: ['cs'],
      clientPermissions: ['EMBED_LINKS'],
      usage: 'configs [subcommand]'
    });
  }

  async run(client, message, [sub]) {
    const Nothing = new MessageEmbed();
    if (!sub) return await message.channel.send(Nothing);
    switch (sub) {
    case 'see': {
      const {
        prefix,
        language,
        adminRoles,
        ignoredChannels,
        autoDeleteModCommands,
        disabledCategories,
        autoDeleteLinks,
        autoDeleteInvites
      } = message.guild.data;
      
      const seeEmbed = new MessageEmbed()
        .setAuthor('Configs', client.user.avatarURL())
        .addField('Language', language, true)
        .addField('Admin Roles', adminRoles.length != 0 ? adminRoles.join(', ') : 'Non', true)
        .addField('Ignored Channels', ignoredChannels.length != 0 ? ignoredChannels.join(', ') : 'Non', true)
        .addField('Disabled Categories', disabledCategories.length != 0 ? disabledCategories.join(', ') : 'Non', true)
        .addField('Delete Mod Commands', autoDeleteModCommands ? 'Yes' : 'No', true)
        .addField('Delete Links', autoDeleteLinks ? 'Yes' : 'No', true)
        .addField('Delete Invites', autoDeleteInvites ? 'Yes' : 'No', true)
        .setFooter(`Guild prefix: ${prefix}`, message.guild.iconURL({ dynamic: true }))
        .setTimestamp();
      await message.channel.send(seeEmbed);
      break;
    }
    default: {
      await message.channel.send(Nothing);
    }
    }
  }
};
