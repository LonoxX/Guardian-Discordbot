const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, channel, oldTopic, newTopic) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setTitle(lang.messages.channel.topic.update.title)
    .setDescription(lang.messages.channel.topic.update.description.replace('{channelName}', channel.name).replace('{channelId}', channel.id))
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL({ dynamic: true }), })
    .addFields(
      lang.messages.channel.topic.update.fields.map(field => ({
        name: field.name,
        value: field.value
          .replace('{oldTopic}', oldTopic)
          .replace('{newTopic}', newTopic)
      }))
    )
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
    .setTimestamp();
  return logChannel.send({ embeds: [embed] });
};
