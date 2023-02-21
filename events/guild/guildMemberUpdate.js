const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, oldMember, newMember) => {
    if (oldMember.nickname !== newMember.nickname) {
    const allLogs = await newMember.guild.fetchAuditLogs({ type: 25 });
    const guild = channel.guild.id;
    const guildData = await SGuilds.findOne({ where: { guildId: guild } });
    const logChannel = await client.channels.cache.get(guildData.logchannel);
    if (!logChannel) return;
    if (newMember.nickname == null) {
      const embed = new Discord.EmbedBuilder()
        .setTitle("Nickname wurde zurückgesetzt")
        .setColor(config.Bot.EmbedColor)
        .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`**<@${newMember.user.id}> hat seinen Nickname zurückgesetzt.**`)
        .addFields(
          { name: "Vorheriger Nickname:", value: oldMember.nickname},
        )
        .setTimestamp()
        .setFooter({ text: newMember.guild.name, iconURL: newMember.guild.iconURL({ dynamic: true }) });
        logChannel.send({ embeds: [embed] });    
    }else {
      const embed = new Discord.EmbedBuilder()
      .setTitle("Nickname wurde geändert")
      .setColor(config.Bot.EmbedColor)
      .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`**<@${newMember.user.id}> hat seinen Nickname geändert.**`)
      .addFields(
        { name: "Neuer Nickname:", value: newMember.nickname},
      )
      .setTimestamp()
      .setFooter({ text: newMember.guild.name, iconURL: newMember.guild.iconURL({ dynamic: true }) });
    logChannel.send({ embeds: [embed] });
    }
  }
};
