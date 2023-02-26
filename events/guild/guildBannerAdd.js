const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (guild, bannerURL) => {
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
  .setDescription(`**${guild.name} has banner now!**`)
  .setImage(bannerURL)
  .setTimestamp()
  return logChannel.send({ embeds: [embed] })
}
