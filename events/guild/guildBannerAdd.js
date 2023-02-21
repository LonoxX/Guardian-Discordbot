const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (guild, bannerURL) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setTitle("Server Banner")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${guild.name} hat jetzt einen Banner!**`)
    .setImage(bannerURL)
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
