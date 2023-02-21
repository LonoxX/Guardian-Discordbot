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
    .setTitle("👩‍👧‍👦 Einladung erstellt")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: invite.guild.name, iconURL: invite.guild.iconURL({ dynamic: true }), })
    .setDescription(  `**<@${fetchModerator.executor.id}> hat eine neue Einladung erstellt für ${invite.channel}**` )
    .addFields(
      { name: "Einladungs link:", value: `[Invite](https://discord.gg/${invite.code})`, inline: true, },
      { name: "Einladung erstellt:", value: `\`${invite.createdAt.toLocaleString()}\`\n**${humanizeDuration( inviteCreated, { round: true } )}**`, inline: true, },
      { name: "Einladung läuft ab um:", value: humanizeDuration(endInvite, { round: true }), inline: true, },
      { name: "User:", value: `<@${invite.inviter.id}>`, inline: true, },
      { name: "Maximale Verwendung:", value: invite.maxUses.toString(), inline: true, }
    )
    .setTimestamp()
    .setFooter({ text: invite.inviter.tag, iconURL: invite.inviter.displayAvatarURL({ dynamic: true }), })
  return logChannel.send({ embeds: [embed] });
};
