require('dotenv').config();
const Rin = require('./structures/Tohsaka.js');
const { registerEvents } = require('./utils/register.js');
const client = new Rin({ partials: ['MESSAGE', 'REACTION'] });

// load events and commands.
(async () => {
  await client.utils.loadCommands();
  await registerEvents(client, '../events');
  // eslint-disable-next-line no-undef
  client.login(process.env.BOT_TOKEN);
})();

client
  .on('disconnect', () => client.logger.log('Rin is disconnecting...', 'warn'))
  .on('reconnecting', () => client.logger.log('Rin is reconnecting...', 'log'))
  .on('error', (err) => client.logger.log(err, 'error'))
  .on('warn', (info) => client.logger.log(info, 'warn'));

// eslint-disable-next-line no-undef
process.on('unhandledRejection', (err) => console.error(err));
