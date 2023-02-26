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
  .setAuthor({ name: emoji.guild.name, iconURL: emoji.guild.iconURL() })
  .setTitle('🥳 Emoji Deleted')
  .setDescription(`**${fetchEmojiAuthor} has deleted <:${emoji.name}:${emoji.id}> emoji!**`)
  .setThumbnail(emoji.url)
  .setFooter({ text: fetchEmojiAuthor.tag, iconURL: fetchEmojiAuthor.displayAvatarURL({ dynamic: true }) })
  .setTimestamp()
  .addFields(
      {
          name: "Responsible Moderator:",
          value: `<@${fetchEmojiAuthor.id}>`
      },
  )
  return logChannel.send({ embeds: [embed] })
}
