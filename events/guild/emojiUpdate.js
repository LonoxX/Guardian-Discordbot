const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, oldEmoji, newEmoji) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  const fetchEmojiAuthor = await newEmoji.fetchAuthor();
  if (oldEmoji.name !== newEmoji.name) {
      const embed = new Discord.EmbedBuilder()
          .setTitle('🤩 Emoji Updated')
          .setAuthor({ name: newEmoji.guild.name, iconURL: newEmoji.guild.iconURL({ dynamic: true }) })
          .setColor(config.Bot.EmbedColor)
          .setDescription(`**${fetchEmojiAuthor} hat <:${newEmoji.name}:${newEmoji.id}> Aktualisiert **`)
          .addFields({
              name: "Old name:",
              value: oldEmoji.name
          }, {
              name: "New name:",
              value: newEmoji.name
          }, {
              name: "User:",
              value: `<@${fetchEmojiAuthor.id}>`
          })
          .setTimestamp()
          .setFooter({ text: fetchEmojiAuthor.tag, iconURL: fetchEmojiAuthor.displayAvatarURL({ dynamic: true }) })
      return logChannel.send({ embeds: [embed] })
  }
};
