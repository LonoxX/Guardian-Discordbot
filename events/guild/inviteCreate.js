const config = require("../../config.json");
const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, invite) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const allLogs = await invite.guild.fetchAuditLogs({ type: 40 });
  const fetchModerator = allLogs.entries.first();
  const inviteCreated = Date.now() - invite.createdTimestamp;
  const endInvite = Date.now() - invite.expiresTimestamp;
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: invite.guild.name, iconURL: invite.guild.iconURL({ dynamic: true }) })
  .setTitle('👩‍👧‍👦 Invite Created')
  .setDescription(`**<@${fetchModerator.executor.id}> has created a new invite for ${invite.channel} channel**`)
  .setTimestamp()
  .setFooter({ text: invite.inviter.tag, iconURL: invite.inviter.displayAvatarURL({ dynamic: true }) })
  .addFields(
      {
          name: "Invite link:",
          value: `[Invite](https://discord.gg/${invite.code})`,
          inline: true
      },
      {
          name: "Invite Created At:",
          value: `\`${invite.createdAt.toLocaleString()}\`\n**${humanizeDuration(inviteCreated, { round: true })}**`,
          inline: true
      },
      {
          name: "Invite Expires At:",
          value: humanizeDuration(endInvite, { round: true }),
          inline: true
      },
      {
          name: "Responsible Moderator:",
          value: `<@${invite.inviter.id}>`,
          inline: true
      },
      {
          name: "Max Uses:",
          value: invite.maxUses.toString(),
          inline: true
      },
  )
  return logChannel.send({ embeds: [embed] })
}
