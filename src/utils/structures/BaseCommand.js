module.exports = class BaseCommand {

  constructor(client, name, options = {}) {
    this.client = client;
    this.name = options.name || name;
    this.cooldown = options.cooldown;
    this.aliases = options.aliases || [];
    this.usage = options.usage || 'No usage provided.';
    this.description = options.description || 'No description provided.';
    this.category = options.category || 'misc';
    this.guildOnly = options.guildOnly || true;
    this.owner = options.owner || false;
    this.permissions = options.permissions = {};
    this.clientPermissions = options.permissions.client || [];
    this.memberPermissions = options.permissions.member || [];
  }

  // eslint-disable-next-line no-unused-vars
  run(client, message, args) {
    throw new Error(`Error: '${this.name}' has no run function!`);
  }
};
