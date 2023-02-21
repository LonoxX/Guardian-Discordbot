const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, role) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const allLogs = await role.guild.fetchAuditLogs({ type: 30 });
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
    .setTitle("♾️ Rolle erstellt")
    .setColor(config.Bot.EmbedColor)
    .setDescription(`👨‍👨‍👧 **\`${role.name}\` wurde erstellt**`)
    .addFields(
      { name: ":id: Role ID:",  value: role.id, },
      { name: "Rollenfarbe:",  value: role.hexColor, },
      { name: "Rollenposition", value: role.position.toString(), },
    )
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
