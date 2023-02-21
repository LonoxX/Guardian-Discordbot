const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, channel) => {
    const allLogs = await channel.guild.fetchAuditLogs({ type: 10 });
    const guild = channel.guild.id;
    const guildData = await SGuilds.findOne({ where: { guildId: guild } });
    const fetchLogs = allLogs.entries.first();
    const logChannel = await client.channels.cache.get(guildData.logchannel);
    if (!logChannel) return;
    const embed = new Discord.EmbedBuilder()
        .setTitle('🏚 Channel erstellt')
        .setColor(config.Bot.EmbedColor)
        .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
        .setDescription(`💬 **Channel Name:** \`${channel.name}\`\n:id: **Channel ID:** \`${channel.id}\`\n🔨 **Channel Type:** \`${channel.type}\``)
        .addFields({  name: "⏰ User:",  value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)` })
        .setTimestamp()
        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
    logChannel.send({ embeds: [embed] })
};
