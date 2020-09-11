module.exports = class BaseEvent {

  /**
   * @param {string} name event name
   */
  constructor(name) {
    this.name = name;
  }

  // eslint-disable-next-line no-unused-vars
  run(client) {
    throw new Error(`Error: '${this.name}' has no run function!`);
  }
};
