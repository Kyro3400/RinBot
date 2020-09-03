/* eslint-disable indent */
module.exports = {
  owners: [''], // bot owners
  support: {
    invite: '', // bot support server
    id: '' // bots id
  },
  githubURL: 'https://github.com/Wilbert-mad/RinBot', // project link DONT REMOVE!
  status: [
    {
      name: '@RanT help : Servers #{{ServerCount}}',
      type: 'PLAYING'
    },
    {
      name: 'Dashboard : Getting Worked On',
      type: 'PLAYING'
    },
  ],
  language: [
    {
      name: 'en-US',
      nativeName: 'English',
      moment: 'en',
      defaultMomentFormat: 'MMMM Do YYYY',
      default: true,
      aliases: [
        'English',
        'en',
        'en-us',
        'en_us',
        'en_US'
      ]
    }
  ],
	dashboard: {
		enabled: false
  },
  colors: {
    TohsakaRed: '#dc1414',
    error: '#c90000',
    good: '#22ae19'
  },
  assets: {
    botIcon: ''
  }
};