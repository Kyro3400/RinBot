const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pokemon',
  category: 'fun',
  usage: 'pokemon <pokemon>',
  aliases: ['pok'],
  description: '',
  clientPermissions: ['EMBED_LINKS'],
  run: async(client, message, args) => {
    const pokemon = await fetch(`https://some-random-api.ml/pokedex?pokemon=charizard`, { method: 'GET' })
      .then(res => res.json());
      // .then(body => console.log(body[0].name));
    const embed = new MessageEmbed()
      .setAuthor(pokemon[0].name);

    await message.channel.send(embed);
  }
};
