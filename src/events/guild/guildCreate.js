const BaseEvent = require('../../utils/structures/BaseEvent');
const guildSchema = require('../../models/guild.js');

module.exports = class NewGuildEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }
  async run(client, guild) {
    // create a new guild profile
    try {
      const schema = await guildSchema.findOne({ guildID: guild.id });
      if (!schema) await guildSchema.create({ guildID: guild.id });
      return;
    } catch (err) { console.log(err); }
  }
};
