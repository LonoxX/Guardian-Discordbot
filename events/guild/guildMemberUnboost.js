const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, member) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true })})
  .setDescription(`**${member} has unboosted ${member.guild.name} server.**`)
  .addField("Total Boosts:", member.guild.premiumSubscriptionCount.toString())
  .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
  .setTimestamp()
  return logChannel.send({ embeds: [embed] });
}
