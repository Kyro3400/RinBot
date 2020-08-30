const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const BaseCommand = require('./structures/BaseCommand.js');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Command', 'status');

module.exports = class Utils {
  constructor(client) {
    this.client = client;
  }

  isClass(input) {
    return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  async loadCommands() {
    return await glob(`${this.directory}commands/**/*.js`).then(async (commands) => {
      for (const commandFile of commands) {
        delete require.cache[commandFile];
        const { name } = path.parse(commandFile);
        const File = require(commandFile);
        if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
        const command = new File(this.client, name.toLowerCase());
        if (!(command instanceof BaseCommand)) throw new TypeError(`Comamnd ${name} doesnt belong in Commands.`);
        table.addRow(command.name, '✔️'); 
        this.client.commands.set(command.name, command);
        if (command.aliases.length) {
          for (const alias of command.aliases) {
            this.client.aliases.set(alias, command.name);
          }
        }
      }
      await this.client.logger.log(`\n${table.toString()}`, 'log');
    });
  }
};
