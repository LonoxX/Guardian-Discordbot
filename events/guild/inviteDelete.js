const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, invite) => {
  const logChannel = await client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const allLogs = await invite.guild.fetchAuditLogs({ type: 42 });
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
    .setTitle("👩‍👧‍👦 Einladung gelöscht")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: invite.guild.name, iconURL: invite.guild.iconURL({ dynamic: true }), })
    .setDescription( `**<@${fetchModerator.executor.id}> hat eine Einladung für ${invite.channel} gelöscht**` )
    .addFields(
      { name: "Einladungs Link:", value: `[Invite](https://discord.gg/${invite.code})`, },
      { name: "Einladungs code:", value: invite.code, },
      { name: "User:", value: `<@${fetchModerator.executor.id}>`, }
    )
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
