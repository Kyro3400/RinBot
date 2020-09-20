const { Schema, model } = require('mongoose');
const configs = require('../../../configs.js');
// might change
module.exports = model('guildconfigs', new Schema({
  guildID: {
    type: String,
    required: true,
    unique: true,
  },
  prefix: {
    type: String,
    default: '$'
  }, 
  language: {
    type: String,
    default: configs.language.find((lan) => lan.default).name
  }, 
  modules: { type: Object,
    default: {
      welcomeMessage: {
        enabled: false, 
        message: null, 
        channel: null, 
        withImage: null 
      },
      goodbyeMessage: {
        enabled: false, 
        message: null, 
        channel: null,
        withImage: null  
      },
      privateMessage: false,
      autoRoles: {
        enabled: false, 
        roles: [] 
      },
      autoMod: {
        enabled: false,
        ignored: [],
        badWords: []
      },
      modlogs: {
        enabled: false,
        channel: null
      },
      logs: {
        enabled: false,
        channel: null
      },
    },
  },
  adminRoles: {
    type: Array, 
    default: [],
  },
  ignoredChannels: { 
    type: Array, 
    default: [],
  },
  autoDeleteModCommands: { 
    type: Boolean, 
    default: false,
  },
  disabledCategories: { 
    type: Array, 
    default: [],
  },
  autoDeleteLinks: {
    type: Boolean,
    default: false,
  },
  autoDeleteInvites: {
    type: Boolean,
    default: false,
  },
  blackListed: {
    type: Boolean,
    default: false,
  }
}));
