const { MessageEmbed } = require('discord.js');
const command = require('../../structures/BaseCommand.js');

module.exports = class Whois extends command {
  constructor() {
    super('whois', {
      category: 'misc',
      usage: 'whois [member]',
      description: 'Gives you info about a memeber',
      guildOnly: true,
      clientPermissions: ['EMBED_LINKS']
    });
  }
  
  async run(client, message, args) {
    const member = message.mentions.members.size === 1 ? message.mentions.members.first() : message.guild.members.cache.get(args[0]);
    if (!args[0]) {
      const { author } = message;
      const authorRoles = await message.member.roles.cache.filter(r => r.position !== 0).map(r => r.toString()).join(' ');
      const serverBoosts = message.member.premiumSince;
  
      const embed = new MessageEmbed()
        .setAuthor(`${author.tag}`, author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(author.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .addField('Registered:', `${author.createdAt.toLocaleString()}`, true)
        .addField('Joined:', `${message.member.joinedAt.toLocaleString()}`, true)
        .addField('Presence:', `${author.presence.status}`, true)
        .addField('Boosts:', (serverBoosts != null ? serverBoosts : 'No Boost'), true)
        .addField(`Roles [${message.member.roles.cache.filter(r => r.position !== 0).size}]`, (authorRoles ? authorRoles : 'None'), true);
      return (await message.channel.send(embed));
    }
    if (!member) {
      const notfound = new MessageEmbed()
        .setDescription(`❌ Couldn't find that member **${args.join(' ')}**.`)
        .setColor();
      return (await message.channel.send(notfound));
    }
    if (member) {
      const memberRoles = await member.roles.cache.filter(r => r.position !== 0).map(r => r.toString()).join(' ');
      const serverBoosts = member.premiumSince;

      const embed = new MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .addField('Registered:', `${member.user.createdAt.toLocaleString()}`, true)
        .addField('Joined:', `${member.joinedAt.toLocaleString()}`, true)
        .addField('Presence:', `${member.presence.status}`, true)
        .addField('Boosts:', (serverBoosts != null ? serverBoosts : 'No Boost'), true)
        .addField(`Roles [${member.roles.cache.filter(r => r.position !== 0).size}]`, (memberRoles ? memberRoles : 'None'), true);
      return (await message.channel.send(embed));
    }
  }
};
