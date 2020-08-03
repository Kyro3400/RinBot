const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'ban',
  aliases: [],
  usage: 'ban <user> [reason]',
  category: 'moderation',
  description: 'ban a user',
  clientPermissions: ['BAN_MEMBERS'],
  run: async (client, message, args) => {
    const errore = new MessageEmbed()
      .setColor('#00ff00')
      .setTitle('Ban Command')
      .addField('Description:', 'Ban a member', true)
      .addField('Usage:', 'ban <user> [reason]', true)
      .addField('Example:', 'ban @member spam');

    if (!message.member.hasPermission('BAN_MEMBERS' || 'ADMINISTRATOR') || !message.guild.owner) return message.channel.send('You are missing Permission: **Ban Members**');

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
      if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
        return message.channel.send(errore);
      } else {
        return message.channel.send('Usage: ban <user> [reason]\nExample: ban @member spam');
      }
    }
    if (!member.bannable) return message.channel.send('I can\'t ban this user!');

    if (member.id === message.author.id) return message.channel.send('You can\'t ban your self');

    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason given';

    await member
      .ban(reason).then(() => {
        message.channel.send(`This user: ${member} was successfully banned.`);
      })
      .catch(err => {
        console.log(err);
        message.channel.sand(`I was unable to ban the member because of: ${err}`);
      });

    const bane = new MessageEmbed()
      .setColor('#00ff00')
      .setTitle(`Ban | ${member.user.tag}`)
      .addField('User', member, true)
      .addField('Moderator', message.author, true)
      .addField('Reason', reason)
      .setTimestamp();
    if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
      message.channel.send(bane);
    } else {
      message.channel.send(`Ban | ${member.user.tag}\nModerator: ${message.author.tag}\nReason: ${reason}`);
    }
  }
};
