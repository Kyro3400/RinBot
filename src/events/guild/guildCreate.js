const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class NewGuildEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }
  async run(client, guild) {
    // create a new guild profile
    try {
      const schema = await client.findOrCreateGuild({ guildID: guild.id });
      return schema;
    } catch (err) { console.log(err); }
  }
};
