const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, oldGuild, newGuild) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setTitle("Server features")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(`**${newGuild.name} features has been updated.**`)
    .addFields(
      { name: "Old Features::", value: oldGuild.features.join(", "), },
      { name: "New Features::", value: newGuild.features.join(", "), }
    )
    .setTimestamp();
  return logChannel.send({ embeds: [embed] });
};
