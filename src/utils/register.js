const BaseEvent = require('../structures/BaseEvent');
const fs = require('fs').promises;
const path = require('path');

async function registerEvents(client, dir = '') {
  // eslint-disable-next-line no-undef
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.logger.log(`Event: "${event.name}" loaded`, 'log');
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

module.exports = { registerEvents };
