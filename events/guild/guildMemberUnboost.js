const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");

module.exports = async (client, member) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const embed = new EmbedBuilder()
    .setTitle("Server Boost")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }), })
    .setDescription(`**${member} Boostet den Server micht mehr**`)
    .addField("Gesamtboosts:", member.guild.premiumSubscriptionCount.toString())
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
