const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, member, role) => {
  const guild = role.guild;
  console.log(guild.id);
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setTitle(lang.messages.member.roleadd.title)
  .setColor(config.Bot.EmbedColor)
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setDescription(lang.messages.member.roleadd.description.replace('{member}', member) .replace('{roleName}', role.name) )
  .setFooter({  text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] })
}
