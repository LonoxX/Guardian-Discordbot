const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, emoji) => {
  const guild = emoji.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setTitle(lang.messages.emoji.delete.title)
  .setColor(config.Bot.EmbedColor)
  .setAuthor({ name: emoji.guild.name, iconURL: emoji.guild.iconURL() })
  .setDescription(lang.messages.emoji.delete.description.replace('{name}', emoji.name).replace('{id}', emoji.id))
  .setThumbnail(emoji.url)
  .setTimestamp()
  .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
  return logChannel.send({ embeds: [embed] })
}
