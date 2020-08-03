module.exports = {
  name: 'purge',
  aliases: ['nuke'],
  usage: 'purge <number>',
  category: 'moderation',
  description: 'purge a number of messages in chat',
  clientPermissions: ['MANAGE_MESSAGES'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES' || 'ADMINISTRATOR') || !message.guild.owner)
      return message.channel.send('Sorry but you are missing permission!')
        .then(m => m.delete({ timeout: 10000 }));

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) 
      return message.channel.send('Enter a number of messages to purge.')
        .then(m => m.delete({ timeout: 10000 }));

    if (message.deletable) await message.delete();

    let deleteamout;

    if (parseInt(args[0]) > 100) { deleteamout = 100; } else { deleteamout = parseInt(args[0]); }
    
    const deletes = await message.channel.bulkDelete(deleteamout, true);
   
    await message.channel.send(`Purged \`${deletes.size}\` messages.`)
      .then(m => m.delete({ timeout: 5000 }));
  }
};
