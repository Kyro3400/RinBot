const BaseEvent = require('../../utils/structures/BaseEvent');
const guildSchema = require('../../models/guild.js');

module.exports = class NewGuildEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }
  async run(client, guild) {
    // create a new guild profile ( as of now it ill not check if this profile is already made )
    try { await guildSchema.create({ guildID: guild.id }); } catch (err) { console.log(err); }
  }
};
