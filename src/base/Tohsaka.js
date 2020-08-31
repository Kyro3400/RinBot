// eslint-disable-next-line no-unused-vars
const { Client, Collection, User } = require('discord.js');
const moment = require('moment');
const Utils = require('../utils/Utils.js');

moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('ss', 5);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 60);
moment.relativeTimeThreshold('d', 24);
moment.relativeTimeThreshold('M', 12);

class Tohsaka extends Client {

  constructor(options = {}) {
    super(options);
    this.configs = require('../../configs.js'); // config file
    this.botEmojis = require('../../global/emojis.json'); // custom emojis 
    this.commands = new Collection(); // commands
    this.aliases = new Collection(); // aliases
    this.logger = require('../../global/logger.js'); // logger
    this.functions = require('../../global/functions.js'); // funtions for database
    this.dashboard = require('../../server/app.js'); // dashboard ( not used )
    this.guildsSchema = require('../models/guild.js');
    this.utils = new Utils(this);
    this.version = require('../../package.json').version; // bot version
    this.owners = ['Xa_puppet#2393']; // owners tag
    this.databaseCache = {}; 
    this.databaseCache.guilds = new Collection();
    this.databaseCache.prefixes = new Collection(); 
    this.databaseCache.timeOut = new Set(); 
  }
  
  /**
   * Check if the user is owner of the Tohsaka client.
   * @param {User} user user checked.
   * @returns {boolean}
   */
  isOwner(user) {
    if (!user) throw new RangeError('Unable to resolve spesefied user.');
    user = this.users.resolve(user);
    if (!this.configs.owners.includes(user.id)) return false;
    return true;
  }

  async findOrCreateGuild({ guildID }, isLean) {
    if (this.databaseCache.guilds.has(guildID)) {
      return isLean ? this.databaseCache.guilds.get(guildID).toJSON() : this.databaseCache.guilds.get(guildID);
    } else {
      let guildData = (isLean ? await this.guildsSchema.findOne({ guildID }).populate('members').lean() : await this.guildsSchema.findOne({ guildID }).populate('members'));
      if (guildData) {
        if (!isLean) this.databaseCache.guilds.set(guildID, guildData);
        return guildData;
      } else {
        guildData = new this.guildsSchema({ guildID });
        await guildData.save();
        this.databaseCache.guilds.set(guildID, guildData);
        return isLean ? guildData.toJSON() : guildData;
      }
    }
  }
}

module.exports = Tohsaka;
