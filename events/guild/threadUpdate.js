const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, oldThread, newThread) => {
  const guild = oldThread.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
  if (oldThread.name !== newThread.name) {
    const embed = new Discord.EmbedBuilder()
    .setTitle(lang.messages.threadUpdate.title)
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, })
    .setDescription(lang.messages.threadUpdate.description.replace('{threadName}', oldThread.name))
    .addFields(lang.messages.threadUpdate.fields.map(field => ({
        name: field.name,
        value: field.value
            .replace('{oldThreadName}', `${oldThread.name}`)
            .replace('{newThreadName}', `${newThread.name}`)
            .replace('{threadParent}', `<#${newThread.parentId}> (<#${newThread.id}>)`)
            .replace('{threadCreator}', `<@${newThread.ownerId}>`)

        })))
    return logChannel.send({ embeds: [embed] })
  }
  if (newThread.archived == true) {
    const embed = new Discord.EmbedBuilder()
    .setTitle(lang.messages.threadUpdate.titlearchived)
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, })
    .addFields(lang.messages.threadUpdate.fieldsarchived.map(field => ({
        name: field.name,
        value: field.value
            .replace('{threadName}', `${oldThread.name}`)
            .replace('{threadParent}', `<#${newThread.parentId}> (<#${newThread.id}>)`)
            .replace('{threadCreator}', `<@${newThread.ownerId}>`)
        })))
    return logChannel.send({ embeds: [embed] })
  } 
  if (newThread.archived == false) {
    const embed = new Discord.EmbedBuilder()
    .setTitle(lang.messages.threadUpdate.titleunarchived)
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, })
    .addFields(lang.messages.threadUpdate.fieldsunarchived.map(field => ({
        name: field.name,
        value: field.value
            .replace('{threadName}', `${oldThread.name}`)
            .replace('{threadParent}', `<#${newThread.parentId}> (<#${newThread.id}>)`)
            .replace('{threadCreator}', `<@${newThread.ownerId}>`)
        })))
    return logChannel.send({ embeds: [embed] })
  }
}