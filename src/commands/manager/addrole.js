const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'addrole',
  aliases: [],
  usage: 'addrole <Name> [Hoist] [hexcolor]',
  category: 'manager',
  description: 'Add a new role',
  clientPermissions: ['MANAGE_ROLES'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR') || !message.guild.owner) 
      return message.channel.send('You dont have permissions to addroles');
    const roleName = args[0];
    const color = args[2];
    let hoisted = args[1].toLowerCase();
    if (message.guild.roles.cache.find(r => r.name === roleName)) 
      return message.channel.send('Role name has alredy been created!');
    if (!roleName) return message.channel.send('No role name is specified!');
    if (!hoisted) hoisted = false;
    if (hoisted) {
      if (hoisted === 'yes') {
        hoisted = true;
      } else {
        hoisted = false;
      }
    }
    try {
      await message.guild.roles.create({
        data: {
          name: roleName,
          color: color,
          hoist: hoisted,
        }
      });
      message.channel.send(`Role \`${roleName}\` Created.`);
    } catch (e) {
      client.logger.log(e, 'error');
      message.channel.send('Faled to create role.');
    }
  }
};