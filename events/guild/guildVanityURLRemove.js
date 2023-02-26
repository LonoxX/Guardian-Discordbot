const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, guild, vanityURL) => {
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
  .setDescription(`**${guild.name} has removed a vanity url** [URL](${vanityURL})`)
  .setTimestamp()
  return logChannel.send({ embeds: [embed] });
}
