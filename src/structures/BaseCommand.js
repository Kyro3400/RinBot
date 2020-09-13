// eslint-disable-next-line no-unused-vars
const Rin = require('./Tohsaka.js');

module.exports = class BaseCommand {

  /**
   * @param {Rin} client client class
   * @param {string} name command name
   * @param {commandOptions} options command options
   */
  constructor(client, name, options = {}) {
    this.client = client;
    this.name = options.name || name;
    this.cooldown = options.cooldown;
    this.aliases = options.aliases || [];
    this.usage = options.usage || 'No usage provided.';
    this.description = options.description || 'No description provided.';
    this.category = options.category || 'misc';
    this.guildOnly = options.guildOnly || true;
    this.owner = options.owner || false;
    this.clientPermissions = options.clientPermissions || [];
    this.memberPermissions = options.memberPermissions || [];
  }

  // eslint-disable-next-line no-unused-vars
  run(client, message, args) {
    throw new Error(`Error: '${this.name}' has no run function!`);
  }
};

/**
 * @typedef {object} commandOptions
 * @property {string} [name] Commands name
 * @property {number} [cooldown] Commands cooldown in secs
 * @property {string[]} aliases Commands aliases
 * @property {string} description Commands description
 * @property {string} category Commands category
 * @property {string} usage Commands usage
 * @property {boolean} [guildOnly] Guild Only Command
 * @property {boolean} [owner] Owner Only Command
 * @property {import('discord.js').PermissionResolvable[]} clientPermissions Rin permission needed
 * @property {import('discord.js').PermissionResolvable[]} memberPermissions Member permission needed
 */