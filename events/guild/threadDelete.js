const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, thread) => {
  const allLogs = await thread.guild.fetchAuditLogs({ type: 112 });    
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const fetchLogs = allLogs.entries.first();
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: thread.guild.name, iconURL: thread.guild.iconURL({ dynamic: true }) })
  .setDescription(`**<@${fetchModerator.executor.id}> has deleted ${thread.name} thread.**`)
  .addField('Responsible Moderator:', `<@${fetchModerator.executor.id}>`)
  .setTimestamp()
  .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
  return logChannel.send({ embeds: [embed] })
}
