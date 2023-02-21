const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, oldGuild, newGuild) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setTitle("Server Besitzer")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${newGuild.name} aktualisierter Besitz**`)
    .addField("Alter Besitzer:", oldGuild.owner.user.tag)
    .addField("Neuer Besitzer:", newGuild.owner.user.tag)
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
