const command = require('../../structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class Kick extends command {
  constructor() {
    super('kick', {
      category: 'moderation',
      clientPermissions: ['KICK_MEMBERS'],
      memberPermissions: ['KICK_MEMBERS'],
      description: 'kick a member from guild',
      usage: 'kick <member> [reason]',
      guildOnly: true,
    });
  }

  async run(client, message, [member, ...reasonArgs]) {
    const kicking = message.mentions.members.first() || message.guild.members.cache.get(member);
    if (!kicking)
      return await message.channel.send('Member not specified or not found');

    if (message.author.id === kicking.id) return message.channel.send('You can\'t kick your self!');    
    let reason = reasonArgs.join(' ');
    if (!reason) reason = 'No reason given.';
    if (!kicking.kickable) return message.channel.send('This member can\'t be kicked');
    if (kicking) {
      await kicking.kick(reason)
        .then(async () => {
          await message.channel.send(`${kicking.user.tag} has been kicked`);
          const kicked = new MessageEmbed()
            .setTitle(`Kick | ${kicking.user.tag}`)
            .addField('User', kicking.user.username, true)
            .addField('Moderator:', message.author.tag, true)
            .addField('Reason:', reason, false)
            .setColor('#2C2F33')
            .setTimestamp();
          const datalogChannel = await message.guild.data.modules.modlogs;
          if (datalogChannel.enabled == false) return;
          if (datalogChannel.channel == null) return;
          const channel = await message.guild.channels.cache.get(datalogChannel.channel);
          if (channel) channel.send(kicked);
        }).catch((err) => {
          client.logger.log(err, 'error');
          message.channel.send('There was in error trying to kick this user. :(');
        });
    } else {
      await message.channel.send('this user isn\'t in the guild sorry');
    }
  }
};
