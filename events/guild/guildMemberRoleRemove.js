const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, member, role) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new EmbedBuilder()
  .setTitle("Role Update")
  .setColor(config.Bot.EmbedColor)
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setDescription(`**:writing_hand: ${member} wurde von ${role.name} entfernt.**`)
  .addFields([
    { name: "User:", value: `${member}`, inline: true, },
    { name: "Role:", value: `✅ ${role.name}`, inline: true, },
  ])
  .setFooter({  text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  
  logChannel.send({ embeds: [embed] });
};

