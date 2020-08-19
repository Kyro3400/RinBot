const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'rolecolor',
  aliases: [],
  usage: 'rolecoloe <role> <hexcolor>',
  category: 'manager',
  description: 'Channge a members name',
  clientPermissions: ['MANAGE_ROLES'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR') || !message.guild.owner) 
      return message.channel.send('You dont have permissions!');
    const role = message.mentions.roles.first() || 
        message.guild.roles.cache.find(r => r.id === args[0]) ||
        message.guild.roles.cache.find(r => r.name === args[0]);
    if (!args[0]) 
      return message.channel.send('You need to provid a role.');
    if (!role) {
      const notfound = new MessageEmbed()
        .setDescription('❌ Couldn\'t find that role.')
        .setColor('#c90000');
      await message.channel.send(notfound);
      return;
    } else {
      const self = message.guild.members.cache.find(m => m.id === client.user.id).roles.highest.position;
      let color = args[1];
      if (parseInt(color) < 16777215) color = 16777215;
      if (parseInt(color) < 0) color = 0;
      if (role.position > self) {
        return message.channel.send('That role is higher then Ace6!');
      } else {
        role.setColor(color.toString());
        const colorEmbed = new MessageEmbed()
          .setColor(color)
          .addField('Role', role.name, true)
          .addField('Moderator', message.author.tag, true)
          .addField('Color', color.toString())
          .setTimestamp();
        message.channel.send(colorEmbed);
      }
    }
  }
};