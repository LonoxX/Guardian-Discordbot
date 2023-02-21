const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");
module.exports = async (client, member, role) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
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

