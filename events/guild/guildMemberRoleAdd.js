const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, member, role) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
  .setDescription(`**:writing_hand: ${member} roles has been updated.**`)
  .addField("Role:", `✅ ${role.name}`)
  .setTimestamp()
  .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
  return logChannel.send({ embeds: [embed] })
}
