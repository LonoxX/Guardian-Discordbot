const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, oldEmoji, newEmoji) => {
    const guild = oldEmoji.guild;
    const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
    const logChannel = await client.channels.cache.get(guildData.logchannel);
    const fetchEmojiAuthor = await newEmoji.fetchAuthor();
    const lang = await getLang(guild);
    if (!logChannel) return;
    if (oldEmoji.name !== newEmoji.name) {
        const embed = new Discord.EmbedBuilder()
            .setTitle(lang.messages.emojiupdate.title)
            .setColor(config.Bot.EmbedColor)
            .setAuthor({ name: newEmoji.guild.name, iconURL: newEmoji.guild.iconURL({ dynamic: true }) })
            .setDescription(lang.messages.emojiupdate.description
                .replace('{fetchEmojiAuthor}', fetchEmojiAuthor)
                .replace('{newEmojiName}', newEmoji.name)
                .replace('{newEmojiId}', newEmoji.id)
                .replace('{oldEmojiName}', oldEmoji.name)
            )
            .addFields(lang.messages.emojiupdate.fields.map(field => ({
                name: field.name,
                value: field.value
                    .replace('{oldEmojiName}', oldEmoji.name)
                    .replace('{newEmojiName}', newEmoji.name)
            })))
        .setTimestamp()
        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });

        return logChannel.send({ embeds: [embed] })
    }
}

