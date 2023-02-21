const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, ban) => {
  const logChannel = await client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const allLogs = await ban.guild.fetchAuditLogs({ type: 23 });
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
    .setTitle("🔨 User entbannt")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }), })
    .setDescription(`**🔨 <@${ban.user.id}> wurde entbannt**`)
    .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
    .addFields(
      { name: "User:", value: `<@${fetchModerator.executor.id}>`, inline: true, },
      { name: "Entbannungsgrund:", value: fetchModerator.reason || "No reason", inline: true, })
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  logChannel.send({ embeds: [embed] });
};
