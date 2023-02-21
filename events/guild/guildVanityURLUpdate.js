const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, guild, oldURL, newURL) => {
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setTitle("Vanity URL")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription( `**${guild.name} hat eine Vanity-URL von geändert [alteURL](${oldURL}) to [neueURL](${newURL})**` )
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
