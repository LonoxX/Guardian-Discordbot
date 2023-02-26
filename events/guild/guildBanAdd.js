const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, ban) => {
  const allLogs = await channel.guild.fetchAuditLogs({ type: 22 });
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const fetchModerator = allLogs.entries.first();
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: ban.user.tag, iconURL: ban.user.displayAvatarURL({ dynamic: true }) })
  .setDescription(`**🔨 <@${ban.user.id}> banned from the server.**`)
  .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }) })
  .addFields(
      {
          name: "Responsible Moderator:",
          value: `<@${fetchModerator.executor.id}>`,
          inline: true
      },
      {
          name: "Ban Reason:",
          value: fetchModerator.reason || '',
          inline: true
      }
  )
  logChannel.send({ embeds: [embed] })
}
