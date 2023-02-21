const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, emoji) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const fetchEmojiAuthor = await emoji.fetchAuthor();
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
      .setTitle('🥳 Emoji erstellt')
      .setColor(config.Bot.EmbedColor)
      .setAuthor({ name: emoji.guild.name, iconURL: emoji.guild.iconURL() })
      .setDescription(`**${fetchEmojiAuthor} hat  <:${emoji.name}:${emoji.id}> erstellt emoji!**`)
      .setThumbnail(emoji.url)
      .addFields({
          name: "User:",
          value: `<@${fetchEmojiAuthor.id}>`
      }, )
      .setTimestamp()
      .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
  return logChannel.send({ embeds: [embed] })
};
