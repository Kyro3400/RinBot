const guildconfigs = require('../src/models/guild.js');

module.exports = {
  /**
   * @param {number} ms Time 
   * @param {boolean} long Short hand 
   * @returns {string} 
  */
  deraton(ms, long = true) {
    const sec = Math.floor((ms / (1000) % 60)).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
    if (min === '0' && hrs === '0' && days === '0') return (`${sec.padStart(2, '0')}${long ? ' seconds' : 's'}`);
    if (hrs === '0' && days === '0') return (`${min.padStart(2, '0')}${long ? ' minutes' : 'm'}, ${sec.padStart(2, '0')}${long ? ' seconds' : 's'}`);
    if (days === '0') return (`${hrs.padStart(2, '0')}${long ? ' hours' : 'h'}, ${min.padStart(2, '0')}${long ? ' minutes' : 'm'}, ${sec.padStart(2, '0')}${long ? ' seconds' : 's'}`);
    return (`${days.padStart(2, '0')}${long ? ' day' : 'd'}, ${hrs.padStart(2, '0')}${long ? ' hours' : 'h'}, ${min.padStart(2, '0')}${long ? ' minutes' : 'm'}, ${sec.padStart(2, '0')}${long ? ' seconds' : 's'}`);
  },
  /** 
   * @param {*} client Client class
   * @param {string} guildID Guild id 
   */
  async getGuildPrefix(client, guildID) {
    try {
      const data = await client.findOrCreateGuild({ guildID });
      const prefix = await data.get('prefix');
      if (typeof prefix === 'string') return prefix;
      return null;
    } catch (err) {
      console.log(err);
    }
  },
  /** @param {string} guildID guild id */
  async allGuildMongoDB(guildID) {
    try {
      const data = await guildconfigs.findOne({ guildID });
      if (data) return data;
      return null;
    } catch (err) {
      console.log(err);
    }
  }
};
