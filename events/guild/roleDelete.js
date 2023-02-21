const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, role) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const allLogs = await role.guild.fetchAuditLogs({ type: 32 });
  const fetchModerator = allLogs.entries.first();
  const embed = new Discord.EmbedBuilder()
      .setTitle('♾️ Rolle gelöscht')
      .setColor(config.Bot.EmbedColor)
      .setAuthor({ name: role.guild.name, iconURL: role.guild.iconURL({ dynamic: true }) })
      .setDescription(`👨‍👨‍👧 **\`${role.name}\` wurde gelöscht.**`)
      .addFields(
        { name: ":id: Role ID:", value: role.id, }, 
        { name: "Rollenfarbe:", value: role.hexColor },
        { name: "User:", value: `<@${fetchModerator.executor.id}>` })
      .setTimestamp()
      .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
  return logChannel.send({ embeds: [embed] })
};
