const command = require('../../structures/BaseCommand.js');
const { MessageEmbed } = require('discord.js');

module.exports = class Info extends command {
  constructor(client) {
    super(client, 'info', {
      category: 'info', 
      usage: 'info',
      aliases: ['about', 'information'],
      description: 'Get info on the RinT',
      clientPermissions: ['EMBED_LINKS'],
      guildOnly: false,
    });
  }

  async run(client, message) {
    const embed = new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.configs.colors.TohsakaRed)
      .addField('Version', client.version, true)
      .addField('Creaters', client.owners, true)
      .addField('Library', 'discord.js', true)
      .addField('Servers', client.guilds.cache.size, true)
      .addField('Users', client.users.cache.size, true)
      .addField('Invite', '[Invite Me](https://discordapp.com/oauth2/authorize?client_id=737527881017720944&scope=bot&permissions=2080898175)', true)
      .addField('Discord', `[Discord server](${client.configs.support.invite})`, true)
      .addField('GitHub', `[GitHub link](${client.configs.githubURL})`, true)
      .setFooter(`Uptime ${client.functions.deraton(client.uptime)}`);
    return (await message.channel.send(embed));
  }
};
