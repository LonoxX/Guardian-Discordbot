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
    .setTitle("🔨 Bann User")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({  name: ban.user.tag, iconURL: ban.user.displayAvatarURL({ dynamic: true }), })
    .setDescription(`**🔨 <@${ban.user.id}> vom Server gebannt.**`)
    .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
    .addFields(
      { name: "User:", value: `<@${fetchModerator.executor.id}>`, inline: true, },
      { name: "Ban Grund:", value: fetchModerator.reason || "", inline: true, }
    )
    .setTimestamp()
    .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }), });
  logChannel.send({ embeds: [embed] });
};
