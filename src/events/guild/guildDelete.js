const BaseEvent = require('../../structures/BaseEvent');

module.exports = class GuildDeleteEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
  }
  async run(client, guild) {
    
  }
};
