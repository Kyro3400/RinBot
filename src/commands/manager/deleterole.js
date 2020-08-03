module.exports = {
  name: 'delrole',
  aliases: [],
  usage: 'delrole <Name>',
  category: 'manager',
  description: 'delete a role',
  clientPermissions: ['MANAGE_ROLES'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR') || !message.guild.owner) 
      return message.channel.send('You dont have permissions to addroles');
    const role = message.mentions.roles.first().id || 
        message.guild.roles.cache.find(r => r.id === args[0]) ||
        message.guild.roles.cache.find(r => r.name === args.join(' ')).id;
    if (!role) return message.channel.send('No role name was provided!');
    let finedrole = message.guild.roles.cache.find(r => r.id === role);
    if (finedrole) {
      try {
        let self = message.guild.members.cache.find(m => m.id === client.user.id).roles.highest.position;
        if (role.position > self) {
          return message.channel.send('Role is higher then Me!');
        } else {
          await message.guild.roles.cache.find(r => r.id === finedrole.id).delete();
          message.channel.send(`Role \`${role}\` deleted.`);
        }
      } catch (err) {
        if (err) console.error(err);
        message.channel.send('Faled to delete role.');
      }
    } else {
      message.channel.send('Couldn\'t find that role.');
    }
  }
};