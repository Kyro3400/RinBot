const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'setnick',
  aliases: ['setnickname'],
  usage: 'setnick <member> <nickname>',
  category: 'manager',
  description: 'Channge a members name',
  clientPermissions: ['MANAGE_NICKNAMES'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_NICKNAMES' || 'ADMINISTRATOR') || !message.guild.owner)
      return message.channel.send('You dont have permissions to change nicknames!');
    let member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[0]);
    if (!args[0]) return message.channel.send('You need to mention a member!');
    if (!member) {
      let notfound = new MessageEmbed()
        .setDescription('❌ Couldn\'t find that user.')
        .setColor('#c90000');
      await message.channel.send(notfound);
      return;
    }
    let self = message.guild.members.cache.find(m => m.id === client.user.id).roles.highest.position;
    if (member.roles.highest.position > self) 
      return message.channel.send('That member is higher then me!');
    let newnick = args.slice(1).join(' ');
    if (!newnick) return message.channel.send('You need a nickname to change to.');
    else {
      const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setTitle(`Change Nickname | ${member.user.tag}`)
        .addField('User', member, true)
        .addField('Moderator', message.author.tag, true)
        .addField('Original', member.nickname ? member.nickname : member.user.username, true)
        .addField('Changed', `${newnick}`)
        .setTimestamp();
      if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
        await message.channel.send(embed);
      } else {
        await message.channel.send(`Change Nickname | ${member.user.tag} To ${newnick}`);
      }
      member.setNickname(newnick);
      return;
    }
  }
};