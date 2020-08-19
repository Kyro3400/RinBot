const { Structures } = require('discord.js');
const guildConfigs = require('../../models/guild.js');

module.exports = Structures.extend('Guild', Guild => {

  class RinGuilds extends Guild {
    constructor() {
      super();
      
      this.modules = async () => {
        const configs = await guildConfigs.findOne({ guildId: this.id });
        if (!configs) {
          try {
            return (await guildConfigs.create({ guildID: this.id })
              .then((guild) => guild.get('modules')));
          } catch (err) {
            console.log(err);
          }
        }
        return configs.get('modules');
      };
      
    }  
  }

  return RinGuilds;
});