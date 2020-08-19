module.exports = class BaseCommand {

  constructor(client, name, options = {}) {
    this.client = client;
    this.name = options.name || name;
    this.aliases = options.aliases || [];
    this.usage = options.usage || 'No usage provided.';
    this.description = options.description || 'No description provided.';
    this.category = options.category || 'misc';
  }

  // eslint-disable-next-line no-unused-vars
  run(message, args) {
    throw new Error(`Error: '${this.name}' has no run function!`);
  }
};
