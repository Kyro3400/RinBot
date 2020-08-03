const { inspect } = require('util');

module.exports = {
  name: 'eval',
  usage: 'eval <code>',
  aliases: ['ev'],
  owner: true,
  description: 'eval code',
  category: 'owners',
  clientPermissions: ['EMBED_LINKS'],
  // eslint-disable-next-line no-unused-vars
  run: (client, message, args, data) => {
    if (client.isOwner(message.author) !== true) return;
    const content = args.join(' ').replace('client.token', 'T0K3N');
    const result = new Promise((resolve) => resolve(eval(content)));
    return result.then(async(output) => {
      if (typeof output !== 'string') { output = inspect(output, { depth: 0 }); }
      if (output.includes(`${client.token}`)) { output = output.replace(`${client.token}`, 'T0K3N'); }
      await message.channel.send(output, { code: 'js', split: true });
    }).catch(async(err) => {
      err = err.toString();
      if (err.includes(`${client.token}`)) { err = err.replace(`${client.token}`, 'T0K3N'); }
      await message.channel.send(err, { code: 'js', split: true });
    });
  }
};
