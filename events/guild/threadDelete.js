const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, thread) => {
  const allLogs = await thread.guild.fetchAuditLogs({ type: 112 });    
  const guild = thread.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
  .setTitle(lang.messages.threadDelete.title)
  .setColor(config.Bot.EmbedColor)
  .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, })
  .setDescription(lang.messages.threadDelete.description)
.addFields(lang.messages.threadDelete.fields.map(field => ({
  name: field.name,
  value: field.value
    .replace('{threadName}', `${thread.name}`)
    .replace('{threadParent}', `<#${thread.parentId}>`)
    .replace('{threadCreator}', `<@${thread.ownerId}>`)
    }))) 

  .setTimestamp()
  .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
  return logChannel.send({ embeds: [embed] })
}