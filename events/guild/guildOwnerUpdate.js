const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client,oldGuild, newGuild) => {

  const guild = oldGuild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  if (!logChannel) return;
  const embed = new Discord.EmbedBuilder()
    .setTitle("Server Besitzer")
    .setColor(config.Bot.EmbedColor)
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
    .setDescription(lang.messages.guildOwnerUpdate.description.replace('{newOwner}',`<@${newGuild.ownerId}>` ))
    .addFields(lang.messages.guildOwnerUpdate.fields.map(field => ({
      name: field.name,
      value: field.value
          .replace('{oldOwner}', `<@${oldGuild.ownerId}>`)
          .replace('{newOwner}',`<@${newGuild.ownerId}>`)
      })))
      .setTimestamp()
      .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
     return logChannel.send({ embeds: [embed] });
};


























  // LonoxX:  396173519953592320
  // Raffael: 792838479964405781



