const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const command = require('../../structures/BaseCommand.js');

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
    if (!pokemon) return await message.send('fun/pokemon:POKEMON_NOTFOUND');
    
    const embed = new MessageEmbed()
      .setAuthor(pokemon.name.split(' ').map(str => `${str.slice(0, 1).toUpperCase() + str.slice(1)}`).join(' '))
      .setDescription(pokemon.description)
      .setThumbnail(pokemon.sprites.animated)
      .addFields(
        {
          name: message.translate('fun/pokemon:HEIGHT'),
          value: pokemon.height,
          inline: true
        },
        {
          name: message.translate('fun/pokemon:WEIGHT'),
          value: pokemon.weight,
          inline: true
        },
        {
          name: message.translate('fun/pokemon:EGG_GROUPS'),
          value: pokemon.egg_groups.map(g => g),
          inline: true
        },
        {
          name: message.translate('fun/pokemon:TYPE'),
          value: pokemon.type.map(t => t),
          inline: true
        },
        {
          name: message.translate('fun/pokemon:STATS'),
          value: `${message.translate('fun/pokemon:TOTAL')}: ${pokemon.stats.total}\n HP: ${pokemon.stats.hp}
          ${message.translate('fun/pokemon:ATTACK')}: ${pokemon.stats.attack}
          ${message.translate('fun/pokemon:DEFENSE')}: ${pokemon.stats.defense} 
          ${message.translate('fun/pokemon:SPEED')}: ${pokemon.stats.speed}`,
          inline: true
        },
        {
          name: message.translate('fun/pokemon:ABILITIES'),
          value: pokemon.abilities.map(a => a),
          inline: true
        },
        {
          name: message.translate('fun/pokemon:SPECIES'),
          value: pokemon.species.filter(p => p !== 'Pokémon').map(s => s),
          inline: true
        }
      );
    await message.channel.send(embed);
  }
};
