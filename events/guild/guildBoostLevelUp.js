const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, guild, oldLevel, newLevel) => {
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new EmbedBuilder()
    .setTitle("Server Boost")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
    .setDescription(`**↖ ${guild.name} Boost-Level **`)
    .addFields(
      { name: "Alte Level:", value: oldLevel.toString(), inline: true,  },
      { name: "Neue Level:", value: newLevel.toString(), inline: true, }
    )
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
