const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, role) => {
  const allLogs = await role.guild.fetchAuditLogs({ type: 32 });
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: role.guild.name, iconURL: role.guild.iconURL({ dynamic: true }) })
  .setTitle('♾️ Role Deleted')
  .setDescription(`👨‍👨‍👧 **\`${role.name}\` role has been deleted.**`)
  .setColor(role.hexColor)
  .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
  .setTimestamp()
  .addFields(
      {
          name: ":id: Role ID:",
          value: role.id,
      },
      {
          name: "Role Color:",
          value: role.hexColor
      },
      {
          name: "Responsible Moderator:",
          value: `<@${fetchModerator.executor.id}>`
      }
  )
  return logChannel.send({ embeds: [embed] })
}
