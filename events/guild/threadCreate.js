const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, thread) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const allLogs = await thread.guild.fetchAuditLogs({ type: 110 });
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
    .setTitle("Thread erstellt")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: thread.guild.name, iconURL: thread.guild.iconURL({ dynamic: true }), })
    .setDescription( `**<@${fetchModerator.executor.id}> erstellt <#${thread.id}> Thread.**` )
    .addFields({ name: "User:", value: `<@${fetchModerator.executor.id}> (\`${fetchModerator.executor.id}`, inline: true, })
    .setTimestamp()
    .setFooter({  text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
