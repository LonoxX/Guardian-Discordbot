const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, member) => {
  const guild = channel.guild.id;
  const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
    const embed = new Discord.EmbedBuilder()
    .setTitle(lang.messages.boost.unboost.title)
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true })})
    .setDescription(lang.messages.boost.unboost.description.replace('{member}', member.toString()))
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
    .setTimestamp()
    return logChannel.send({ embeds: [embed] });
}
