const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, message,channel) => {
  const allLogs = await message.guild.fetchAuditLogs({ type: 72 });  
  const guild = message.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const fetchModerator = allLogs.entries.first();
  if (message.channel == guildData.logchannel) return;
  if (!logChannel) return console.log("logChannel not found") ;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
  .setDescription(`🗑 **Message sent by ${message.author} deleted in ${message.channel}.**\n${message.content}`)
  .addField('Responsible Moderator:', `<@${fetchModerator.executor.id}>`)
  .setTimestamp()
  .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
  return logChannel.send({ embeds: [embed] })
}
