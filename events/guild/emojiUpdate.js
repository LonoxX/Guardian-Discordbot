const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, oldEmoji, newEmoji) => {
    const guild = channel.guild.id;
    const guildData = await SGuilds.findOne({ where: { guildId: guild } });
    const logChannel = await client.channels.cache.get(guildData.logchannel);
    const fetchEmojiAuthor = await newEmoji.fetchAuthor();
    if (!logChannel) return;
    if (oldEmoji.name !== newEmoji.name) {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: newEmoji.guild.name, iconURL: newEmoji.guild.iconURL({ dynamic: true }) })
        .setTimestamp()
        .setFooter({ text: fetchEmojiAuthor.tag, iconURL: fetchEmojiAuthor.displayAvatarURL({ dynamic: true }) })
        .setTitle('🤩 Emoji Updated')
        .setDescription(`**${fetchEmojiAuthor} has updated <:${newEmoji.name}:${newEmoji.id}> emoji**`)
        .addFields(
            {
                name: "Old name:",
                value: oldEmoji.name
            },
            {
                name: "New name:",
                value: newEmoji.name
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchEmojiAuthor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
}
