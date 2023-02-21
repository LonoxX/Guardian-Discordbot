const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, member) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
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
