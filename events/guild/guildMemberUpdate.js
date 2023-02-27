const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, oldMember, newMember) => {
    if (oldMember.nickname !== newMember.nickname) {
      const allLogs = await newMember.guild.fetchAuditLogs({ type: 25 });
      const guild = oldMember.guild;
      const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
      const logChannel = await client.channels.cache.get(guildData.logchannel);
    const lang = await getLang(guild);
    if (!logChannel) return;
    // wenn newMember nickname === null  wurde der name zurückgesetzt
    if (oldMember.nickname !== newMember.nickname) {
      // wenn newMember nickname === null wurde der Name zurückgesetzt
      if (newMember.nickname == null) {
        console.log("Nickname wurde zurückgesetzt");
        const embed = new Discord.EmbedBuilder()
          .setTitle(lang.messages.nichname.reset.title)
          .setColor(config.Bot.EmbedColor)
          .setDescription(`**<@${newMember.user.id}> ${lang.messages.nichname.reset.description}**`)
          .addFields(lang.messages.nichname.reset.fields.map(field => ({
            name: field.name,
            value: field.value
              .replace("{oldNickname}", oldMember.nickname)
          })))
          .setTimestamp()
          .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
          logChannel.send({ embeds: [embed] });    
      } else {
        console.log("Nickname wurde geändert");
        const embed = new Discord.EmbedBuilder()
        .setTitle(lang.messages.nichname.update.title)
        .setColor(config.Bot.EmbedColor)
        .setDescription(`**<@${newMember.user.id}> ${lang.messages.nichname.update.description}**`)
        .addFields(lang.messages.nichname.update.fields.map(field => ({
          name: field.name,
          value: field.value
            .replace("{oldNickname}", oldMember.nickname)
            .replace("{newNickname}", newMember.nickname)
        })))
        .setTimestamp()
        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
        logChannel.send({ embeds: [embed] });
      }
    }
  }
};
