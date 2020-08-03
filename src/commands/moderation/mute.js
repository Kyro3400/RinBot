const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'mute',
  aliases: [],
  category: 'moderation',
  description: 'ban a user',
  usage: 'mute <user> [reason]',
  clientPermissions: ['MANAGE_ROLES'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR') || !message.guild.owner)
      return message.channel.send('You are missing Permission: **MANAGE_ROLES**');
    
    //get the mentons user, retern if there is none.
    const tomute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!tomute) return message.channel.send('**You did not identify a user/id!!**');
    
    // if the mutee has the same or a  higher role thene the muter, retern.
    let Mrole = message.guild.roles.cache.find(r => r.name === ('Muted'));
    if (!Mrole) {
      try {
        Mrole = await message.guild.roles.create({
          data: {
            name: 'Muted',
            color: '#818386',
            Permissions: [],
          },
        });
    
        message.guild.channels.cache.forEach(async (channel) => {
          await channel.createOverwrite(Mrole.id, { SEND_MESSAGES: false });
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    let reason = args[1];
    if (!reason) reason = 'No reason we provided';
    
    if (tomute.id === message.author.id) return message.channel.send(`You can't mute youself ${message.author.tag}`);
    
    if (tomute.roles.cache.find(r => r.name === ('Muted'))) return message.channel.send('this member thas already been muted');
    
    await (tomute.roles.add(Mrole.id));
    const muted = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(`Mute | ${tomute.user.tag}`, tomute.user.avatarURL({ dynamic: true }))
      .setThumbnail(tomute.user.avatarURL({ dynamic: true }))
      .addField('Moderator', message.author, true)
      .addField('Member', tomute, true)
      .addField('Reason', reason, true)
      .setTimestamp();
    if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
      message.channel.send(muted);
    } else {
      message.channel.send(`User ${tomute} has been muted for ${reason}`);
    }
  }
};
