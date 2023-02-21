const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, message) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  if (message.channel == config.Server.LogChannel)return;
  const allLogs = await message.guild.fetchAuditLogs({ type: 72 });
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }),  })
    .setColor(config.Bot.EmbedColor)
    .setDescription( `🗑 **Nachricht gesendet von ${message.author} gelöscht in ${message.channel}.**\n${message.content}` )
    .setTimestamp()
    .setFooter({  text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }), });
  return logChannel.send({ embeds: [embed] });
};
