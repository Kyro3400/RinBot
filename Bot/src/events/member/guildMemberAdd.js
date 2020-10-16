const BaseEvent = require('../../structures/BaseEvent');

module.exports = class MemberJoinEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const { guild } = member;
    const { welcomeMessage } = guild.data.guild.modules;
    if (welcomeMessage.enabled) {
      let msg = welcomeMessage.message;
      if (msg == null) return;
      if (welcomeMessage.channel == null) return;
      msg = msg
        .replace('{server}', guild.name)
        .replace('{member}', member.user.name)
        .replace('{member_tag}', member.user.tag)
        .replace('{member_mention}', member.mention);
      try {
        const channel = await guild.channels.cache.get(welcomeMessage.channel);
        if (!channel) return;
        await channel.send(msg);
      } catch (err) {
        client.logger.log(err, 'error');
      }
    } else if (!welcomeMessage.enabled) return; 
  }
};
