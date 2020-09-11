const guildconfigs = require('../src/models/guild.js');

module.exports = {
  /**
   * @param {number} ms Time 
   * @returns {string} 
  */
  deraton(ms) {
    const sec = Math.floor((ms / (1000) % 60)).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
    if (min === '0' && hrs === '0' && days === '0') return (`${sec.padStart(2, '0')} seconds`);
    if (hrs === '0' && days === '0') return (`${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`);
    if (days === '0') return (`${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`);
    return (`${days.padStart(2, '0')} day, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`);
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
