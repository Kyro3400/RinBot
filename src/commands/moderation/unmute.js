const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'unmute',
  aliases: [],
  category: 'moderation',
  description: 'This will unmute a muted user in your server',
  usage: 'unmute <user> [reason]',
  clientPermissions: ['MANAGE_ROLES'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR') || !message.guild.owner)
      return message.channel.send('You need Permission!');

    const tomute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!tomute) return message.channel.send('**you did not spesify a user/id!!**');
    let Mrole = message.guild.roles.cache.find(r => r.name === ('Muted'));
    if (!Mrole) {
      try {
        Mrole = await message.guild.roles.create({
          data: {
            name: 'Muted',
            color: '#000000',
            Permissions: [],
          },
        });
    
        message.guild.channels.cache.forEach(async(channel) => {
          await channel.createOverwrite(Mrole.id, { SEND_MESSAGES: false });
        });
          
      } catch (err) {
        console.log(err.stack);
      }
    }
    let reason = args[1];
    if (!reason) reason = 'No reason we provided';

    if (tomute === message.author) return message.channel.send('You can\'t mute youself!');

    if (!tomute.roles.cache.find(r => r.name === ('Muted'))) return message.channel.send('this user thas is not muted!');

    await (tomute.roles.remove(Mrole.id));
    const muted = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(`Unmute | ${tomute}`, tomute.user.avatarURL({ dynamic: true }))
      .setThumbnail(tomute.user.avatarURL({ dynamic: true }))
      .addField('Moderator', message.author, true)
      .addField('Member', tomute, true)
      .addField('Reason', reason, true)
      .setTimestamp();
    if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
      message.channel.send(muted);
    } else {
      message.channel.send(`User ${tomute} has been unmuted for ${reason}`);
    }
  }
};