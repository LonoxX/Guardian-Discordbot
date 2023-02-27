const config = require("../../config.json");
const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, invite) => {
  const allLogs = await invite.guild.fetchAuditLogs({ type: 40 });
  const guild = invite.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const fetchModerator = allLogs.entries.first();
  const inviteCreated = Date.now() - invite.createdTimestamp;
  const endInvite = Date.now() - invite.expiresTimestamp;
  const lang = await getLang(guild);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setTitle(lang.messages.inviteCreate.title)
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: invite.guild.name, iconURL: invite.guild.iconURL({ dynamic: true }) })
    .setDescription(lang.messages.inviteCreate.description.replace('{username}', `<@${fetchModerator.executor.id}>`).replace('{channelName}', `${invite.channel}`))
    .addFields(lang.messages.inviteCreate.fields.map(field => ({
        name: field.name,
        value: field.value
            .replace('{inviteCode}', invite.code)
            .replace('{inviteURL}', invite.url)
            .replace('{inviteCreator}', invite.inviter.tag)
            .replace('{inviteExpiresAt}', humanizeDuration(endInvite, { round: true }))
        })))
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] })
}