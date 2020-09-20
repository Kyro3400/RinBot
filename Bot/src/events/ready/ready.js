require('dotenv').config();
const BaseEvent = require('../../structures/BaseEvent');
const status = require('../../../../configs').status;
const mongoose = require('mongoose');
let i = 0;

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {
    client.logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, 'ready');
    setInterval(() => {
      const toDisplay = status[parseInt(i, 10)].name.replace('{{ServerCount}}', client.guilds.cache.size);
      client.user.setActivity(toDisplay, { type: status[parseInt(i, 10)].type });
      if (status[parseInt(i + 1, 10)]) i++;
      else i = 0;
    }, 30000);
    
    // if (client.configs.dashboard.enabled) { await client.dashboard.load(client); }
    
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONG_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }, (err) => {
      if (err) throw err;
      else client.logger.log('Mong DB connected.', 'ready');
    });
  }
};
