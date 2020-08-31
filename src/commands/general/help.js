const { MessageEmbed } = require('discord.js');
const command = require('../../utils/structures/BaseCommand.js');

module.exports = class Help extends command {
  constructor(client) {
    super(client, 'help', {
      category: 'general',
      usage: 'help [command]',
      aliases: ['h'],
      description: 'Show a help menu',
    });
  }

  async run(client, message, [command]) {
    const embed = new MessageEmbed();
    if (command) {
      const cmd = client.commands.get(command.toLowerCase()) || 
        client.commands.get(client.aliases.get(command.toLowerCase()));
      if (!cmd) return (await message.channel.send(embed.setColor(client.configs.colors.error)
        .setDescription(`No information found for command **${command.toLowerCase()}**`)));
      embed.setAuthor(`${capita(cmd.name)}`)
        .setDescription([
          `**Command name**: ${cmd.name}`,
          `**Aliases**: ${cmd.aliases.length ? cmd.aliases.map(a => `\`${a}\``).join(' ') : 'No Aliases'}`,
          `**Description**: ${cmd.description.length ? cmd.description : 'No description'}`,
          `**Usage**: ${message.guild.data.prefix}${cmd.usage.length ? cmd.usage : 'No Usage'}`
        ])
        .setFooter('Syntax: <> = required, [] = optional', message.author.displayAvatarURL({ dynamic: true }))
        .setColor(client.configs.colors.good);
      return (await message.channel.send(embed));
    } else {
      let categorys;
      if (client.isOwner(message.author) !== true) {
        categorys = removeDuplicates(client.commands.filter(cmd => cmd.category !== 'owners').map(cmd => cmd.category));
      } else {
        categorys = removeDuplicates(client.commands.map(cmd => cmd.category));
      }
      for (const category of categorys) {
        embed.addField(`**${capita(category)}**`, client.commands.filter(cmd => 
          cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '), true)
          // .setThumbnail(client.configs.assets)
          .setTitle(`__${client.user.username} commands__`)
          .setThumbnail(client.user.displayAvatarURL())
          .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
          .setColor(client.configs.colors.good)
          .setTimestamp();
      }
      return (await message.channel.send(embed));
    }
  }
};

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function capita(string) {
  return string
    .split(' ')
    .map(str => `${str.slice(0, 1).toUpperCase() + str.slice(1)}`)
    .join(' ');
}
