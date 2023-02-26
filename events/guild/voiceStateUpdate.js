const config = require("../../config.json");
const Discord = require('discord.js');
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, oldState, newState) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setFooter({ text: newState.guild.name, iconURL: newState.guild.iconURL({ dynamic: true }) })
    .setDescription(`**${newState.member} moved from \`${oldState.channel.name}\` to \`${newState.channel.name}\`**`)
    return logChannel.send({ embeds: [embed] })
}
  if (!oldState.channel.id && newState.channel.id) {
      const embed = new Discord.EmbedBuilder()
      .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setFooter({ text: newState.guild.name, iconURL: newState.guild.iconURL({ dynamic: true }) })
      .setDescription(`**🔊 ${newState.member} has joined \`${newState.channel.name}\` channel.**`)
      return logChannel.send({ embeds: [embed] })
  }
}