const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, ban) => {
  const allLogs = await ban.guild.fetchAuditLogs({ type: 22 });
  const guild = ban.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const fetchModerator = allLogs.entries.first();
  const lang = await getLang(guild);
  console.log(ban.user.id);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setTitle(lang.messages.ban.add.title)
  .setColor(config.Bot.EmbedColor)
  .setAuthor({ name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }), })
  .setDescription(lang.messages.ban.add.description .replace('{userId}', ban.user.id))
  .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
  .addFields(lang.messages.ban.add.fields.map(field => ({
    name: field.name,
    value: field.value
        .replace('{moderatorId}', fetchModerator.executor.id)
        .replace('{reason}',fetchModerator.reason)
    })))
  .setTimestamp()
  .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  logChannel.send({ embeds: [embed] });
};
