const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, guild, oldLevel, newLevel) => {
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
  .setDescription(`**↖ ${guild.name} reaches new boost level.**`)
  .addField("Old Level:", oldLevel.toString())
  .addField("New Level:", newLevel.toString())
  .setTimestamp()
  return logChannel.send({ embeds: [embed] })
}
