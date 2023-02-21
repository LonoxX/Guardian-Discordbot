const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, guild, oldURL, newURL) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
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
