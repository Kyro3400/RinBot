const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'unban',
  category: 'moderation',
  description: 'Unban a user',
  usage: 'unban <member> [reason]',
  clientPermissions: ['BAN_MEMBERS'],
  run: async (client, message, args) => {
    const errore = new MessageEmbed()
      .setColor(client.configs.colors.error)
      .setTitle('Unban Command')
      .addField('Description:', 'Unban a member', true)
      .addField('Usage:', 'unban <userID> [reason]', true)
      .addField('Example:', 'unban @memberID Apologized');

    if (!message.member.hasPermission('BAN_MEMBERS' || 'ADMINISTRATOR') || !message.guild.owner) 
      return message.channel.send('You dont have permission to perform this command!');

    const unbanned = client.users.resolveID(args[0]);
    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason given!';
    const member = await client.users.fetch(unbanned).catch(() => {});
    const ban = await message.guild.fetchBans().catch(() => {});
    if (!member) {
      if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
        return message.channel.send(errore);
      } else {
        return message.channel.send('Usage: unban <userID> [reason]\nExample: unban @memberID Apologized');
      }
    }

    if (!ban.get(member.id)) {
      const notbannedembed = new MessageEmbed()
        .setDescription('This user is not banned')
        .setColor('#2C2F33');
      if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
        return message.channel.send(notbannedembed);
      } else {
        return message.channel.send('This user is not banned');
      }
    }
    message.guild.members.unban(member, reason);
    const successfullyembed = new MessageEmbed()
      .setTitle(`Unban | ${member.tag}`)
      .setColor('#2C2F33')
      .addField('User', member, true)
      .addField('Moderator:', message.author.tag, true)
      .addField('Reason:', reason)
      .setTimestamp();
    if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
      message.channel.send(successfullyembed);
    } else {
      message.channel.send(`Unban | ${member.tag}\nReason: ${reason}`);
    }
  },
};