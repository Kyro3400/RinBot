const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const command = require('../../utils/structures/BaseCommand.js');

module.exports = class pokemon extends command {
  constructor(client) {
    super(client, 'pokemon', {
      category: 'fun',
      usage: 'pokemon <pokemon>',
      aliases: ['pok'],
    });
  }

  async run(client, message, args) {
    const pokemonName = args[0];
    if (!pokemonName) return;
    const pokemon = await (await axios.default.get(`https://some-random-api.ml/pokedex?pokemon=${pokemonName}`)).data;
    if (!pokemon) return await message.channel.send('Pokemon not found!');
    
    const embed = new MessageEmbed()
      .setAuthor(pokemon.name.split(' ').map(str => `${str.slice(0, 1).toUpperCase() + str.slice(1)}`).join(' '))
      .setDescription(pokemon.description)
      .setThumbnail(pokemon.sprites.animated)
      .addFields(
        {
          name: 'Height',
          value: pokemon.height,
          inline: true
        },
        {
          name: 'Weight',
          value: pokemon.weight,
          inline: true
        },
        {
          name: 'Egg Groups',
          value: pokemon.egg_groups.map(g => g),
          inline: true
        },
        {
          name: 'Type',
          value: pokemon.type.map(t => t),
          inline: true
        },
        {
          name: 'Stats',
          value: `Total: ${pokemon.stats.total}\n HP: ${pokemon.stats.hp}\n Attack: ${pokemon.stats.attack}\n Defense: ${pokemon.stats.defense}\n Speed: ${pokemon.stats.speed}`,
          inline: true
        },
        {
          name: 'Abilities',
          value: pokemon.abilities.map(a => a),
          inline: true
        },
        {
          name: 'Species',
          value: pokemon.species.filter(p => p !== 'Pokémon').map(s => s),
          inline: true
        }
      );
    await message.channel.send(embed);
  }
};
