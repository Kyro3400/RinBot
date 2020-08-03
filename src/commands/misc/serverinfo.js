const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  aliases: ['guildinfo', 'guild'],
  usage: 'serverinfo',
  category: 'info',
  description: 'Get server information',
  clientPermissions: ['EMBED_LINKS'],
  run: async (client, message) => {
    const { guild } = message;
    let embed = new MessageEmbed()
      .setAuthor(`${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true}))
      .setFooter(`ID: ${guild.id}`)
      .setTimestamp()
      .setColor('RANDOM')
      .addField('Owner', `${guild.owner.user.tag}`, true)
      .addField('Region', guild.region, true)
      .addField('Total members', `${guild.memberCount} members,
            ${guild.members.cache.filter(member => !member.user.bot).size} Humans, 
            ${guild.members.cache.filter(member => member.user.bot).size} Bots`, true)
      .addField('Channels', `${guild.channels.cache.filter(ch => ch.type === 'category').size} channel categorys
            ${guild.channels.cache.filter(ch => ch.type === 'text').size} Text channels, 
            ${guild.channels.cache.filter(ch => ch.type === 'voice').size} Voice channels`, true)
      .addField('Roles', `${guild.roles.cache.size}`, true)
      .addField('Role List', guild.roles.cache.map(r => r.name).join(', '))
      .addField('Created', `${guild.createdAt.toLocaleString()}`, true);
    if (embed.length > 1000) {
      let embed2 = new MessageEmbed()
        .setAuthor(`${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true}))
        .setFooter(`ID: ${guild.id}`)
        .setTimestamp()
        .setColor('RANDOM')
        .addField('Owner', `${guild.owner.user.tag}`, true)
        .addField('Region', guild.region, true)
        .addField('Total members', `${guild.memberCount} members,
                    ${guild.members.cache.filter(member => !member.user.bot).size} Humans, 
                    ${guild.members.cache.filter(member => member.user.bot).size} Bots`, true)
        .addField('Channels', `${guild.channels.cache.filter(ch => ch.type === 'category').size} channel categorys
                    ${guild.channels.cache.filter(ch => ch.type === 'text').size} Text channels, 
                    ${guild.channels.cache.filter(ch => ch.type === 'voice').size} Voice channels`, true)
        .addField('Roles', `${guild.roles.cache.size}`, true)
        .addField('Created', `${guild.createdAt.toLocaleString()}`, true);
      return (await message.channel.send(embed2).catch(err => console.log(err)));
    } else
      return (await message.channel.send(embed).catch(err => console.log(err)));
  }
};