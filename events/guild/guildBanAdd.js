const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, ban) => {
  const logChannel = await client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const allLogs = await ban.guild.fetchAuditLogs({ type: 22 });
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
    .setTitle("🔨 Bann User")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({  name: ban.user.tag, iconURL: ban.user.displayAvatarURL({ dynamic: true }), })
    .setDescription(`**🔨 <@${ban.user.id}> vom Server gebannt.**`)
    .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
    .addFields(
      { name: "User:", value: `<@${fetchModerator.executor.id}>`, inline: true, },
      { name: "Ban Grund:", value: fetchModerator.reason || "", inline: true, }
    )
    .setTimestamp()
    .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }), });
  logChannel.send({ embeds: [embed] });
};
