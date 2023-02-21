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
