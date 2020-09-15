// eslint-disable-next-line no-unused-vars
const { Rin, MessageRin } = require('../../types');
const { Collection, MessageEmbed } = require('discord.js');
const BaseEvent = require('../../structures/BaseEvent');
const cooldowns = new Collection();

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  /**
   * @param {Rin} client -
   * @param {MessageRin} message -
   * @returns {any | void}
   */
  async run(client, message) {
    if (message.guild && !message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
    if (message.author.bot) return;

    const data = {};
    let prefix;
    
    if (client.databaseCache.prefixes.has(message.guild.id)) {
      prefix = await client.databaseCache.prefixes.get(message.guild.id);
    } else {
      const status = await client.functions.getGuildPrefix(client, message.guild.id);
      await client.databaseCache.prefixes.set(message.guild.id, status);
      prefix = status;
    }
   
    if (message.guild) {
      const guild = await client.findOrCreateGuild({ guildID: message.guild.id });
      message.guild.data = (data.guild) = guild;
    }

    /** @type {String} */
    data.prefix = await client.databaseCache.prefixes.get(message.guild.id);

    const prefixes = [prefix, `<@!${client.user.id}>`];
    
    prefix = prefixes.find(p => message.content.startsWith(p));
    
    if (!prefix) return;

    if (message.content.indexOf(prefix) !== 0) return;

    const messageArray = message.content.split(new RegExp(/\s+/));
    const command = messageArray[0].toLowerCase();
    const args = messageArray.slice(1);
    
    const cmd = client.commands.get(command.slice(prefix.length)) ||
      client.commands.get(client.aliases.get(command.slice(prefix.length)));
    if (!cmd) {
      if (message.guild) { return; } else { 
        return;
      }
    }

    if (cmd === undefined) return;

    if (message.guild) {
      const neededPermission = [];
      cmd.clientPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.guild.me).has(perm) ||
          !message.member.hasPermission(perm)) {
          neededPermission.push(perm);
        }
      });
      if (neededPermission.length > 0)
        return message.channel.send(`Missing permissions ${neededPermission.map((p) => p).join(', ')}`);
      cmd.memberPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.member).has(perm) ||
          !message.member.hasPermission(perm)) {
          neededPermission.push(perm);
        }
      });
      if (neededPermission.length > 0) 
        return message.channel.send(`Missing permissions ${neededPermission.map((p) => p).join(', ')}`);
    }
    // testing v
    if (cmd.owner === undefined) cmd.owner === false;
    if (cmd.owner === true && !client.isOwner(message.author)) return;
    // testing ^

    if (cmd.guildOnly && !message.guild) return message.channel.send('Guild only command');
    
    if (!cooldowns.has(cmd.name)) { cooldowns.set(cmd.name, new Collection()); }

    const now = Date.now();
    const timestamps = cooldowns.get(cmd.name);
    const cooldownAmount = (cmd.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now);
        const coolDownsEmbed = new MessageEmbed()
          .setAuthor(`${message.author.tag} | Cooldown`, message.author.displayAvatarURL())
          .addField(`Command | ${cmd.name.toLowerCase()}`, `Wait ${client.functions.deraton(timeLeft)} before reusing this command.`);
        if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send(coolDownsEmbed);
        else return message.channel.send(`Command: ${cmd.name.toLowerCase()} Time: ${client.functions.deraton(timeLeft)}.`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      if (cmd) cmd.run(client, message, args);
    } catch (err) {
      client.logger.log(`${err.message || err}`, 'error');
    }
  }
};
