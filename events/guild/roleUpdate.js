const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, oldRole, newRole) => {
      const allLogs = await newRole.guild.fetchAuditLogs({ type: 25 });
      const fetchLogs = allLogs.entries.first();
      const guild = newRole.guild;
      const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
      const logChannel = await client.channels.cache.get(guildData.logchannel);
      const lang = await getLang(guild);
      if (!logChannel) return;
      const fetchModerator = await allLogs.entries.first();
      if (oldRole.color !== newRole.color) {
        const embed = new Discord.EmbedBuilder()
        .setTitle(lang.messages.roleUpdate.title)
        .setColor(config.Bot.EmbedColor)
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, })
        .setDescription(lang.messages.roleUpdate.description.replace('{roleName}', `<@${newRole}>`))
        .addFields(lang.messages.roleUpdate.fields.map(field => ({
            name: field.name,
            value: field.value  
                .replace('{oldRoleName}', `\`\`\`\n${oldRole.name}\`\`\``)
                .replace('{newRoleName}', `\`\`\`\n${newRole.name}\`\`\``)
                .replace('{oldRoleColor}', `\`\`\`\n${oldRole.color}\`\`\``)
                .replace('{newRoleColor}', `\`\`\`\n${newRole.color}\`\`\``)
                .replace('{roleId}', `\`\`\`\n${newRole}\`\`\``)
            })))
        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setTimestamp()
        return logChannel.send({ embeds: [embed] })
    }
    if (oldRole.name !== newRole.name) {
        const embed = new Discord.EmbedBuilder()
        .setTitle(lang.messages.roleUpdate.titlename)
        .setColor(config.Bot.EmbedColor)
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, })
        .setDescription(lang.messages.roleUpdate.description.replace('{roleName}', `<@${newRole}>`))
        .addFields(lang.messages.roleUpdate.fields.map(field => ({
            name: field.name,
            value: field.value  
                .replace('{oldRoleName}', `\`\`\`\n${oldRole.name}\`\`\``)
                .replace('{newRoleName}', `\`\`\`\n${newRole.name}\`\`\``)
                .replace('{roleId}', `\`\`\`\n${newRole.id}\`\`\``)
                .replace('{fetchModerator}', `<@${fetchModerator.executor.id}>`)
            })))
        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setTimestamp()
        return logChannel.send({ embeds: [embed] })
    }
}
