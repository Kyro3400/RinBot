const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class MemberJoinEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  async run(client, member) {
    
  }
};
