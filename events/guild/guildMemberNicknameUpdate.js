const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, member, oldNickname, newNickname) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
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
