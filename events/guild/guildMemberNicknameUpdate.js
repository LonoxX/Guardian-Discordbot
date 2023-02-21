const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, member, oldNickname, newNickname) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setTitle("Nickname Update")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }), })
    .setDescription(`**${member} Spitzname wurde geändert.**`)
    .addFields(
      { name: "🏁 Alter Nickname:", value: oldNickname || "Kein Spitzname", },
      { name: "🏁 Neuer Nickname:", value: newNickname || "No Nickname", } 
      )
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
};
