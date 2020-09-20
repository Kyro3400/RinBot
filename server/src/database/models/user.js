const mongoose = require('mongoose');

module.exports = mongoose.model('users', new mongoose.Schema({
  discordID: {
    type: String,
    required: true,
  },
  userTag: {
    type: String,
    required: true,
  },
  userGuilds: {
    type: [{ 
      type: mongoose.Types.ObjectId,
      ref: 'guilds', 
      required: true,
    }],
  },
}));
