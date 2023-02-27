const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, oldMessgae, newMessage) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  if (oldMessgae.content !== newMessage.content) {
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
    .setDescription(`📝 **Message sent by ${newMessage.author} edited in ${newMessage.channel}.** [Jump To Message](${newMessage.url}})`)
    .addFields(
        {
            name: "Old:",
            value: `\`\`\`\n${oldMessgae.content}\`\`\``
        },
        {
            name: "New:",
            value: `\`\`\`\n${newMessage.content}\`\`\``
        }
    )
    return logChannel.send({ embeds: [embed] })
}
}
