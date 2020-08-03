const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'kick',
  category: 'moderation',
  aliases: [],
  description: 'kick a user',
  usage: 'kick <user> [reason]',
  clientPermissions: ['KICK_MEMBERS'],
  run: (client, message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS' || 'ADMINISTRATOR') || !message.guild.owner)
      return message.channel.send('You are missing Permission: **Kick Members**');
        
    const user = message.mentions.users.first();
    const errore = new MessageEmbed()
      .setColor('#00ff00')
      .setTitle('Kick Command')
      .addField('Description:', 'kick a member', true)
      .addField('Usage:', 'kick <user> [reason]', true)
      .addField('Example:', 'kick @member spam');

    if (!user) {
      if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
        return message.channel.send(errore);
      } else {
        return message.channel.send('Usage: kick <user> [reason]\nExample: kick @member spam');
      }
    }
    if (user) {
      const member = message.guild.member(user);
      if (message.author.id === member.id) return message.channel.send('You can\'t kick your self!');
      let reason = args.slice(1).join(' ');
      if (!reason) reason = 'No reason given.';
      if (!member.kickable) return message.channel.send('this user cant be kicked');
      if (member) {
        member.kick(reason)
          .then(() => {
            const successfullyembed = new MessageEmbed()
              .setTitle(`Kick | ${user.tag}`)
              .setColor('#2C2F33')
              .addField('User', user.username, true)
              .addField('Moderator:', message.author.tag, true)
              .addField('Reason:', reason, false)
              .setTimestamp();
            if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
              message.channel.send(successfullyembed);
            } else {
              message.channel.send(`Kick | ${user.tag}\nModerator: ${message.author.tag}\nReason: ${reason}`);
            }
          }).catch(err => {
            message.channel.send(`There was in error kicking ${user.tag} error: \n${err.message}`);
            console.log(err.stack);
          });
      } else {
        message.channel.send('this user isn\'t in the guild sorry');
      }
    } else {
      message.channel.send('you didn\'t menton a user!');
    }
  }
};