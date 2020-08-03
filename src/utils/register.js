const BaseEvent = require('./structures/BaseEvent');
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

const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Command', 'status');

async function registerCommands(client) {
  readdirSync('./src/commands/').forEach(dir => {
    const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
    for (const file of commands) {
      const pull = require(`../commands/${dir}/${file}`);
      if (pull.name) { 
        client.commands.set(pull.name, pull);
        if (!pull.category) throw new TypeError(`"${pull.name}" no category found!`);
        if (typeof pull.usage !== 'string') throw new TypeError(`"${pull.name}" usage is a string`);
        if (typeof pull.description !== 'string') throw new TypeError(`"${pull.name}" description is a string`);
        table.addRow(file, '✔️');
      } else {
        table.addRow(file, '❌  -> missing a help.name, or help.name is not a string.');
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }
  });

  await client.logger.log(`\n${table.toString()}`, 'log');
}

module.exports = { registerEvents, registerCommands };
