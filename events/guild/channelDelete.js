const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, channel) => {
    const allLogs = await channel.guild.fetchAuditLogs({ type: 12 });
    const guild = channel.guild;
    const guildData = await SGuilds.findOne({ where: { guildId: guild.id } });
    const fetchLogs = allLogs.entries.first();
    const logChannel = await client.channels.cache.get(guildData.logchannel);
    const lang = await getLang(guild);
    const channelDescription = lang.messages.channelDelete.description
    .replace('{name}', channel.name)
    .replace('{id}', channel.id)
    .replace('{type}', channel.type);
    if (!logChannel) return;

    const embed = new Discord.EmbedBuilder()
        .setTitle(lang.messages.channelDelete.title)
        .setColor(config.Bot.EmbedColor)
        .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
        .setDescription(channelDescription)
        .addFields({  name: "⏰ User:",  value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)` })
        .setTimestamp()
        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
    logChannel.send({ embeds: [embed] })
};
