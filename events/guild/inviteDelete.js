const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, invite) => {
  const allLogs = await invite.guild.fetchAuditLogs({ type: 42 });
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const fetchModerator = allLogs.entries.first();
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: invite.guild.name, iconURL: invite.guild.iconURL({ dynamic: true }) })
  .setTitle('👩‍👧‍👦 Invite Deleted')
  .setDescription(`**<@${fetchModerator.executor.id}> has deleted a invite for ${invite.channel} channel**`)
  .setTimestamp()
  .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
  .addFields(
      {
          name: "Invite link:",
          value: `[Invite](https://discord.gg/${invite.code})`,
          inline: true
      },
      {
          name: "Invite Code:",
          value: invite.code,
          inline: true
      },
      {
          name: "Responsible Moderator:",
          value: `<@${fetchModerator.executor.id}>`,
          inline: true
      },
  )
  return logChannel.send({ embeds: [embed] })
}
