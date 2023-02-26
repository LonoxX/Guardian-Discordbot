const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, emoji,channel) => {
  const guild = emoji.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const fetchEmojiAuthor = await emoji.fetchAuthor();
  const lang = await getLang(guild);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: emoji.guild.name, iconURL: emoji.guild.iconURL() })
  .setTitle(lang.messages.emoji.create.title)
  .setDescription(lang.messages.emoji.create.description.replace('{name}', emoji.name).replace('{id}', emoji.id).replace('{id}'))
  //.setDescription(`**${fetchEmojiAuthor} has created <:${emoji.name}:${emoji.id}> emoji!**`)
  .setThumbnail(emoji.url)
  .setFooter({ text: fetchEmojiAuthor.tag, iconURL: fetchEmojiAuthor.displayAvatarURL({ dynamic: true }) })
  .setTimestamp()
  .addFields({ name: "⏰ User:",  value: `<@${fetchEmojiAuthor.id}>` },
  )
  return logChannel.send({ embeds: [embed] })
}
