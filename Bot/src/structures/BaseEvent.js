module.exports = class BaseEvent {
  
  constructor(name) {
    this.name = name;
  }

  // eslint-disable-next-line no-unused-vars
  run(client) {
    throw new Error(`Error: '${this.name}' has no run function!`);
  }
};
