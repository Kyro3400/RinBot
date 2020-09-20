const { MessageEmbed } = require('discord.js');
const command = require('../../structures/BaseCommand.js');

module.exports = class RoleInfo extends command {
  constructor() {
    super('roleinfo', {
      usage: 'roleinfo <role>',
      category: 'misc',
      description: 'Get info on a role',
      clientPermissions: ['EMBED_LINKS'],
      guildOnly: true,
    });
  }

  async run(client, message, args) {
    const role = message.mentions.roles.first() || 
    message.guild.roles.cache.find(r => r.id === args[0]) || 
    message.guild.roles.cache.find(r => r.name === args.join(' '));
    if (!args[0]) return message.channel.send('You need to provide a role!');
    if (role) {
      const color = role.hexColor;
      const roleinfo = new MessageEmbed()
        .setColor(role.color)
        .addField('ID', role.id, true)
        .addField('Name', role.name, true)
        .addField('Color', (color != '#000000' ? color : 'None'), true)
        .addField('Mention', `\`<@&${role.id}>\``, true)
        .addField('Position', role.position, true)
        .addField('Hoist', (role.hoist ? 'Yes' : 'No'), true)
        .addField('Mentionable', (role.mentionable ? 'Yes' : 'No'), true)
        .setFooter('Role Created')
        .setTimestamp(role.createdAt);
      return (await message.channel.send(roleinfo));
    } else {
      const notfound = new MessageEmbed()
        .setDescription('❌ Couldn\'t find that role.')
        .setColor('#c90000');
      return (await message.channel.send(notfound));
    }  
  }
};
