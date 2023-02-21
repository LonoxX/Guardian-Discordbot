const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");

module.exports = async (client, member) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const embed = new EmbedBuilder()
    .setTitle("Server Boost")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }), })
    .setDescription(`**${member}  hat den Server gerade geboostet**`)
    .addFields({ name: "Gesamtboosts:", value: member.guild.premiumSubscriptionCount.toString(), inline: true, })
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
