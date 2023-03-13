const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, role) => {
  const allLogs = await role.guild.fetchAuditLogs({ type: 30 });
    const guild = role.guild;
    const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
    const logChannel = await client.channels.cache.get(guildData.logchannel);
    const lang = await getLang(guild);
    const fetchModerator = allLogs.entries.first();
  if (!logChannel) return;    
  const embed = new Discord.EmbedBuilder()
  .setTitle(lang.messages.roleCreate.title)
  .setColor(config.Bot.EmbedColor)
  .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, })
  .setDescription(lang.messages.roleCreate.description.replace('{roleName}', role.name))
    .addFields(lang.messages.roleCreate.fields.map(field => ({
        name: field.name,
        value: field.value  
            .replace('{roleName}', `\`\`\`\n${role.name}\`\`\``)
            .replace('{roleId}', `\`\`\`\n${role.id}\`\`\``)
        })))
  .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
  .setTimestamp()
  
  return logChannel.send({ embeds: [embed] })
}
