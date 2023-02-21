const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, oldchannel , channel , oldTopic, newTopic) => {
    console.log(channel.name+"'s topic changed to " + newTopic +"!");


      const allLogs = await channel.guild.fetchAuditLogs({ type: 11 });
      const fetchLogs = allLogs.entries.first();
      const logChannel = await client.channels.cache.get(config.Server.LogChannel);
      if (!logChannel) return;
      // wenn der channel name geändert wurde
        if (oldchannel.name !== channel.name) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('🏚 Channel geändert')
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(`Alter Channel Name: \`${oldchannel.name}\`\nNeuer Channel Name: \`${channel.name}\``)
                .addFields({
                    name: "⏰ User:",
                    value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`
                })
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        // wenn der channel topic geändert wurde
        if (oldchannel.topic !== channel.topic) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('🏚 Channel geändert')
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(`Alter Channel Topic: \`${oldchannel.topic}\`\nNeuer Channel Topic: \`${channel.topic}\``)
                .addFields({
                    name: "⏰ User:",
                    value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`
                })
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        // wenn der channel nsfw geändert wurde
        if (oldchannel.nsfw !== channel.nsfw) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('🏚 Channel geändert')
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(`Alter Channel NSFW: \`${oldchannel.nsfw}\`\nNeuer Channel NSFW: \`${channel.nsfw}\``)
                .addFields({
                    name: "⏰ User:",
                    value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`
                })
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        // wenn der channel slowmode geändert wurde
        if (oldchannel.rateLimitPerUser !== channel.rateLimitPerUser) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('🏚 Channel geändert')
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(`Alter Channel Slowmode: \`${oldchannel.rateLimitPerUser}\`\nNeuer Channel Slowmode: \`${channel.rateLimitPerUser}\``)
                .addFields({
                    name: "⏰ User:",
                    value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`
                })
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        // wenn der channel type geändert wurde
        if (oldchannel.type !== channel.type) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('🏚 Channel geändert')
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(`Alter Channel Type: \`${oldchannel.type}\`\nNeuer Channel Type: \`${channel.type}\``)
                .addFields({
                    name: "⏰ User:",
                    value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`
                })
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        // wenn der channel bitrate geändert wurde
        if (oldchannel.bitrate !== channel.bitrate) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('🏚 Channel geändert')
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(`Alter Channel Bitrate: \`${oldchannel.bitrate}\`\nNeuer Channel Bitrate: \`${channel.bitrate}\``)
                .addFields({
                    name: "⏰ User:",
                    value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`
                })
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
        // wenn der channel userlimit geändert wurde
        if (oldchannel.userLimit !== channel.userLimit) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('🏚 Channel geändert')
                .setColor(config.Bot.EmbedColor)
                .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                .setDescription(`Alter Channel Userlimit: \`${oldchannel.userLimit}\`\nNeuer Channel Userlimit: \`${channel.userLimit}\``)
                .addFields({
                    name: "⏰ User:",
                    value: `<@${fetchLogs.executor.id}> (\`${fetchLogs.executor.id}\`)`
                })
                .setTimestamp()
                .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
            logChannel.send({ embeds: [embed] })
        }
};
