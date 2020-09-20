const { MessageEmbed } = require('discord.js');
const command = require('../../structures/BaseCommand.js');

module.exports = class EightBall extends command {
  constructor() {
    super('8ball', {
      category: 'fun',
      description: 'Asks the 8 Ball a question',
      usage: '8ball <question>',
    });
  }

  async run(client, message, args) {
    if (!args[0]) return message.send('fun/8ball:NO_QUESTION');
    const replies = [
      ...message.translate('fun/8ball:REPLIES', { returnObjects: true }),
      message.translate('general:YES'),
      message.translate('general:NO'),
    ];
    const result = Math.floor((Math.random() * replies.length));
    const question = args.join(' ');
    if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
      const embed = new MessageEmbed()
        .setAuthor(message.translate('fun/8ball:AUTHOR'))
        .setColor('ORANGE')
        .addField(`${message.translate('fun/8ball:QUESTION')}:`, question)
        .addField(`${message.translate('fun/8ball:ANSWER')}:`, replies[result]);
      await message.channel.send(embed);
    } else {
      await message.channel.send(`**${message.translate('fun/8ball:QUESTION')
      }:** ${question}\n**${message.translate('fun/8ball:ANSWER')
      }:** ${replies[result]}`);
    }
  }
};