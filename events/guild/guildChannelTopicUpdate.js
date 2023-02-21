const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, channel, oldTopic, newTopic) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL({ dynamic: true }), })
    .addFields(
      { name: "📝 Old Topic:", value: oldTopic || "None", },
      { ame: "📝 New Topic", value: newTopic || "None", }
    )
    .setTimestamp();
  return logChannel.send({ embeds: [embed] });
};
