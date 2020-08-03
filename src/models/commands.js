const mongoose = require('mongoose');
// still in bata
module.exports = mongoose.model('commands', new mongoose.Schema({
  commandName: {
    type: String,
    required: true
  },
  alowedRoles: {
    type: Array,
    default: []
  },
  ignoreRoles: {
    type: String,
    default: []
  },
  ignoreChannel: {
    type: Array,
    default: []
  },
  alowedChannels: {
    type: Array,
    default: []
  } 
}));
