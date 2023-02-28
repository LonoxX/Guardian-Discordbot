const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, message,channel) => {
  const allLogs = await message.guild.fetchAuditLogs({ type: 72 });  
  const guild = message.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const fetchModerator = allLogs.entries.first();
  const lang = await getLang(guild);
  if (!logChannel) return;
  if (message.channel == guildData.logchannel) return;
  const embed = new Discord.EmbedBuilder()
  .setTitle(lang.messages.messageDelete.title)
  .setColor(config.Bot.EmbedColor)
  .setAuthor({ name:`${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
  .setDescription(lang.messages.messageDelete.description.replace('{username}', `${message.author}`).replace('{channelName}', `${message.channel}`))
  .addFields(lang.messages.messageDelete.fields.map(field => ({
    name: field.name,
    value: field.value
        .replace('{messageContent}', message.content)
        .replace('{fetchModerator}', `<@${fetchModerator.executor.id}>`)
    })))
  .setTimestamp()
  .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
  return logChannel.send({ embeds: [embed] })
}
