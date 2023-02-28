const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, oldMessgae, newMessage) => {
  const guild = oldMessgae.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
  if (oldMessgae.content !== newMessage.content) {
    const embed = new Discord.EmbedBuilder()
    .setTitle(lang.messages.messageUpdate.title)
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, })
    .setDescription(lang.messages.messageUpdate.description.replace('{username}', oldMessgae.author.username).replace('{channelName}', oldMessgae.channel.name).replace('{oldMessage}', oldMessgae.content))
    .addFields(lang.messages.ban.add.fields.map(field => ({
        name: field.name,
        value: field.value
            .replace('{oldMessageContent}', `\`\`\`\n${oldMessgae.content}\`\`\``)
            .replace('{newMessageContent}', `\`\`\`\n${newMessage.content}\`\`\``)
        })))
    return logChannel.send({ embeds: [embed] })
}
}
