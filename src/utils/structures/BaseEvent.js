module.exports = class BaseEvent {

  constructor(name) {
    this.name = name;
  }

  // eslint-disable-next-line no-unused-vars
  run(client, message) {
    throw new Error(`Error: '${this.name}' has no run function!`);
  }
};
