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
    .setTitle("Thread gelöscht")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: thread.guild.name, iconURL: thread.guild.iconURL({ dynamic: true }), })
    .setDescription( `**<@${fetchModerator.executor.id}> Löscht den ${thread.name} Thread.**`  )
    .addFields({ name: "User:", value: `<@${fetchModerator.executor.id}> (\`${fetchModerator.executor.id}`, inline: true, })
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
