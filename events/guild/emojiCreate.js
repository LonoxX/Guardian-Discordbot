const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, emoji) => {
  const guild = emoji.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const fetchEmojiAuthor = await emoji.fetchAuthor();
  const lang = await getLang(guild);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setTitle(lang.messages.emoji.create.title)
  .setAuthor({ name: emoji.guild.name, iconURL: emoji.guild.iconURL() })
  .setDescription(lang.messages.emoji.create.description.replace('{name}', emoji.name).replace('{id}', emoji.id).replace('{id}'))
  .setThumbnail(emoji.url)
  .setTimestamp()
  .addFields({ name: "⏰ User:",  value: `<@${fetchEmojiAuthor.id}>` },
  )
  .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });

  return logChannel.send({ embeds: [embed] })
}
