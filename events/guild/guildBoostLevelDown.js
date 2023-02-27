const config = require("../../config.json");
const { EmbedBuilder, Discord } = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, guild, oldLevel, newLevel) => {
  const guild = oldLevel.guild;    
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
  .setTitle(lang.messages.boost.leveldown.title)
  .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })  
  .setDescription(lang.messages.boost.leveldown.description .replace('{newBoostLevel}', newLevel.toString()))
  .addFields(lang.messages.boost.leveldown.fields.map(field => ({
    name: field.name,
    value: field.value
      .replace('{guildName}', guild.name)
      .replace('{oldBoostLevel}', oldLevel.toString())
      .replace('{newBoostLevel}', newLevel.toString())
    })))
  .setTimestamp()
  return logChannel.send({ embeds: [embed] })
}
