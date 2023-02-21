const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, emoji) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const fetchEmojiAuthor = await emoji.fetchAuthor();
  const embed = new Discord.EmbedBuilder()
      .setTitle('🥳 Emoji gelöscht')
      .setColor(config.Bot.EmbedColor)
      .setAuthor({ name: emoji.guild.name, iconURL: emoji.guild.iconURL() })
      .setDescription(`**${fetchEmojiAuthor} hat gelöst <:${emoji.name}:${emoji.id}> emoji!**`)
      .setThumbnail(emoji.url)
      .addFields({
          name: "User:",
          value: `<@${fetchEmojiAuthor.id}>`
      }, )
      .setTimestamp()
      .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
  return logChannel.send({ embeds: [embed] })
};
