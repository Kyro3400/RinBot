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

  async run(client, message, [sub, ...args], data) {
    const Nothing = new MessageEmbed();
    if (!sub) return await message.channel.send(Nothing);
    switch (sub.toLowerCase()) {
    case 'see': {
      const {
        prefix,
        language,
        adminRoles,
        ignoredChannels,
        autoDeleteModCommands,
        disabledCategories,
        autoDeleteLinks,
        autoDeleteInvites,
        modules: {
          modlogs
        },
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
        .addField('Mod logs', modlogs.enabled == true ? modlogs.channel : 'Non', true)
        .setFooter(`Guild prefix: ${prefix}`, message.guild.iconURL({ dynamic: true }))
        .setTimestamp();
      await message.channel.send(seeEmbed);
      break;
    }
    case 'modlogset': {
      const channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
      if (!channel) return;
      if (channel.type !== 'text') return;
      if (channel) {
        data.guild.modules.modlogs.channel = channel.id;
        await data.guild.markModified('modules.modlogs.channel');
        await data.guild.save().then(async () => {
          await message.channel.send(`Channel set to #${channel.name}`);
        });
      }
      break;
    }
    case 'modlog': {
      const [choice] = args;
      if (!choice) return;
      if (choice.toLowerCase() === 'on') {
        if (data.guild.modules.modlogs.enabled == true) 
          return await message.channel.send('Module is already on');
        data.guild.modules.modlogs.enabled = true;
        await data.guild.markModified('modules.modlogs.enabled');
        await data.guild.save().then(async () => {
          await message.channel.send('Modlogs have been enebled');
        });
      } else if (choice.toLowerCase() === 'off') {
        if (data.guild.modules.modlogs.enabled == false) 
          return await message.channel.send('Module is already off');
        data.guild.modules.modlogs.enabled = false;
        await data.guild.markModified('modules.modlogs.enabled');
        await data.guild.save().then(async () => {
          await message.channel.send('Modlogs have been disable');
        });
      } else return;
      break;
    }
    default: {
      await message.channel.send(Nothing);
    }
    }
  }
};
