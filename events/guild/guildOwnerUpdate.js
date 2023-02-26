const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, oldGuild, newGuild) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
  .setDescription(`**${newGuild.name} updated ownership**`)
  .addField("Old Owner:", oldGuild.owner.user.tag)
  .addField("New Owner:", newGuild.owner.user.tag)
  .setTimestamp()
  return logChannel.send({ embeds: [embed] })
}
