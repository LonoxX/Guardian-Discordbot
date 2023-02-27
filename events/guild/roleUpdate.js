const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, oldRole, newRole) => {
      const allLogs = await newRole.guild.fetchAuditLogs({ type: 25 });
      const guild = channel.guild.id;
      const guildData = await SGuilds.findOne({ where: { guildId: guild } });
      const fetchLogs = allLogs.entries.first();
      const logChannel = await client.channels.cache.get(guildData.logchannel);
      if (!logChannel) return;
      const fetchModerator = await allLogs.entries.first();
      if (oldRole.color !== newRole.color) {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
  .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setTimestamp()
        .addFields(
            {
                name: "Old Color:",
                value: oldRole.hexColor
            },
            {
                name: "New Color:",
                value: newRole.hexColor
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
    if (oldRole.name !== newRole.name) {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setTimestamp()
        .addFields(
            {
                name: "Old name:",
                value: oldRole.name
            },
            {
                name: "New name:",
                value: newRole.name
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
}
