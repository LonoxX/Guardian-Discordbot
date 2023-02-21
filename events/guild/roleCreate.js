const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, role) => {
  const allLogs = await role.guild.fetchAuditLogs({ type: 30 });
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
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
