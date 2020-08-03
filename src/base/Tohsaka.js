// eslint-disable-next-line no-unused-vars
const { Client, Collection, User } = require('discord.js');

class Tohsaka extends Client {

  constructor(options) {
    super(options);
    this.configs = require('../../configs.js'); // config file
    this.botEmojis = require('../../global/emojis.json'); // custom emojis 
    this.commands = new Collection(); // commands
    this.aliases = new Collection(); // aliases
    this.logger = require('../../global/logger.js'); // logger
    this.functions = require('../../global/functions.js'); // funtions for database
    this.dashboard = require('../../server/app.js'); // dashboard ( not used )
    this.version = require('../../package.json').version; // bot version
    this.owners = ['Xa_puppet#2393']; // owners tag
    this.databaseCache = {}; 
    this.databaseCache.prefixes = new Collection(); // guilds preix
    this.databaseCache.timeOut = new Set(); // deletes guilds after 3days of not joining back (not used)
  }
  
  /**
   * Check if the user is owner of the Tohsaka.
   * @param {User} user user checked.
   * @returns {boolean}
   */
  isOwner(user) {
    if (!user) throw new RangeError('Unable to resolve spesefied user.');
    user = this.users.resolve(user);
    if (!this.configs.owners.includes(user.id)) return false;
    return true;
  }
}

module.exports = Tohsaka;
