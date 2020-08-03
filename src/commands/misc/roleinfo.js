const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'roleinfo',
  aliases: [],
  usage: 'roleinfo <role>',
  category: 'info',
  description: 'Get info on a role',
  clientPermissions: ['EMBED_LINKS'],
  run: async (client, message, args) => {
    const role = message.mentions.roles.first() || 
    message.guild.roles.cache.find(r => r.id === args[0]) || 
    message.guild.roles.cache.find(r => r.name === args.join(' '));
    if (!args[0]) return message.channel.send('You need to provide a role!');
    if (role) {        
      let ishoist = role.hoist;
      if (ishoist === true) ishoist = 'Yes';
      if (ishoist === false) ishoist = 'No';
      let ismentionable = role.mentionable;
      if (ismentionable === true) ismentionable = 'Yes';
      if (ismentionable === false) ismentionable = 'No';
      const color = role.hexColor;
      const roleinfo = new MessageEmbed()
        .setColor(role.color)
        .addField('ID', role.id, true)
        .addField('Name', role.name, true)
        .addField('Color', (color != '#000000' ? color : 'None'), true)
        .addField('Mention', `\`<@&${role.id}>\``, true)
        .addField('Position', role.position, true)
        .addField('Hoist', ishoist, true)
        .addField('Mentionable', ismentionable, true)
        .setFooter('Role Created')
        .setTimestamp(`${role.createdAt}`);
      return (await message.channel.send(roleinfo));
    } else {
      let notfound = new MessageEmbed()
        .setDescription('❌ Couldn\'t find that role.')
        .setColor('#c90000');
      return (await message.channel.send(notfound));
    }  
  }
};