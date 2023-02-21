const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, oldMessgae, newMessage) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;
  if (oldMessgae.content !== newMessage.content) {
    const embed = new Discord.EmbedBuilder()
      .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }), })
      .setColor(config.Bot.EmbedColor)
      .setTimestamp()
      .setFooter({ text: newMessage.author.tag,  iconURL: newMessage.author.displayAvatarURL({ dynamic: true }),  })
      .setDescription(
        `📝 **Nachricht gesendet von${newMessage.author} bearbeitet in ${newMessage.channel}.** [Zur Nachricht springen](${newMessage.url}})` )
      .addFields(
        { name: "Alt:",  value: `\`\`\`\n${oldMessgae.content}\`\`\``, },
        { name: "Neu:", value: `\`\`\`\n${newMessage.content}\`\`\``, }
      );
    return logChannel.send({ embeds: [embed] });
  }
};
