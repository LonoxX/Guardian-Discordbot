const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, role) => {
  const allLogs = await role.guild.fetchAuditLogs({ type: 32 });
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
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
