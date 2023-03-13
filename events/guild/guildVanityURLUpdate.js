const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, guild, oldURL, newURL) => {
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setTitle(lang.messages.guildUpdateVanity.title)
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, })
    .addFields(lang.messages.guildUpdateVanity.fields.map(field => ({
      name: field.name,
      value: field.value
          .replace('{oldVanityURL}', `${oldURL}`)
          .replace('{newVanityURL}', `${newURL}`)
      })))
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  return logChannel.send({ embeds: [embed] });
};
