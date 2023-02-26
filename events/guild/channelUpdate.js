const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, oldchannel , channel , oldTopic, newTopic) => {
      const allLogs = await channel.guild.fetchAuditLogs({ type: 11 });
      const guild = channel.guild;
      const guildData = await SGuilds.findOne({ where: { guildId: guild.id } });
      const fetchLogs = allLogs.entries.first();
      const logChannel = await client.channels.cache.get(guildData.logchannel);
      const lang = await getLang(guild);
    if (!logChannel) return;
        if (oldchannel.name !== channel.name) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(lang.messages.channelUpdate.title)
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(lang.messages.channelUpdate.updateName.replace('{oldName}', oldchannel.name).replace('{newName}', channel.name))
                .addFields({ name: "⏰ User:", value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`})
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        if (oldchannel.topic !== channel.topic) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(lang.messages.channelUpdate.title)
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(lang.messages.channelUpdate.updateTopic.replace('{oldTopic}', oldchannel.topic).replace('{newTopic}', channel.topic))
                .addFields({ name: "⏰ User:", value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`})
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        if (oldchannel.nsfw !== channel.nsfw) {
            const embed = new Discord.EmbedBuilder()
            .setTitle(lang.messages.channelUpdate.title)
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(lang.messages.channelUpdate.UpdateNSFW.replace('{oldNSFW}', oldchannel.nsfw).replace('{newNSFW}', channel.nsfw))
                .addFields({ name: "⏰ User:", value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`})
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        if (oldchannel.rateLimitPerUser !== channel.rateLimitPerUser) {
            const embed = new Discord.EmbedBuilder()
            .setTitle(lang.messages.channelUpdate.title)
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(lang.messages.channelUpdate.UpdateSlowmode.replace('{oldSlowmode}', oldchannel.rateLimitPerUser).replace('{newSlowmode}', channel.rateLimitPerUser))
                .addFields({ name: "⏰ User:", value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`})
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        if (oldchannel.type !== channel.type) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(lang.messages.channelUpdate.title)
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(lang.messages.channelUpdate.UpdateType.replace('{oldType}', oldchannel.type).replace('{newType}', channel.type))
                .addFields({ name: "⏰ User:", value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`})
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        if (oldchannel.bitrate !== channel.bitrate) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(lang.messages.channelUpdate.title)
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(lang.messages.channelUpdate.UpdateBitrate.replace('{oldBitrate}', oldchannel.bitrate).replace('{newBitrate}', channel.bitrate))
                .addFields({ name: "⏰ User:", value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`})
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        if (oldchannel.userLimit !== channel.userLimit) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(lang.messages.channelUpdate.title)
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(lang.messages.channelUpdate.UpdateUserLimit.replace('{oldUserLimit}', oldchannel.userLimit).replace('{newUserLimit}', channel.userLimit))
                .addFields({ name: "⏰ User:", value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`})
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
};
