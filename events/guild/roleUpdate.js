const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = async (client, oldRole, newRole) => {
      const logChannel = client.channels.cache.get(config.Server.LogChannel);
      if (!logChannel) return;
      const allLogs = await newRole.guild.fetchAuditLogs({ type: 25 });
      const fetchModerator = await allLogs.entries.first();
      if (oldRole.color !== newRole.color) {
          const embed = new Discord.EmbedBuilder()
              .setTitle('🔧 Rolle geändert')
              .setColor(config.Bot.EmbedColor)
              .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
              .setDescription(`😛 **\`${newRole.name}\` wurde aktualisiert.**`)
              .addFields({ 
                name: "Alte Farbe:", value: oldRole.hexColor },
                 { name: "Neue Farbe:",  value: newRole.hexColor },
                 { name: "User:",  value: `<@${fetchModerator.executor.id}>` })
              .setTimestamp()
              .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
          return logChannel.send({ embeds: [embed] })
      }
      if (oldRole.name !== newRole.name) {
          const embed = new Discord.EmbedBuilder()
              .setTitle('🔧 Rolle geändert')
              .setColor(config.Bot.EmbedColor)
              .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
              .setDescription(`😛 **\`${newRole.name}\` wurde aktualisiert.**`)
              .addFields(
                { name: "Alter Name:", value: oldRole.name },
                { name: "Neuer Name:", value: newRole.name },
                { name: "User:", value: `<@${fetchModerator.executor.id}>` })
              .setTimestamp()
              .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
          return logChannel.send({ embeds: [embed] })
      }
};
