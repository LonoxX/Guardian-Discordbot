const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, member, oldNickname, newNickname) => {
  // const guild = channel.guild.id;
  // const guildData = await SGuilds.findOne({ where: { guildId: guild } });
  // const logChannel = await client.channels.cache.get(guildData.logchannel);
  // const lang = await getLang(guild);
  // if (!logChannel) return;
  // const embed = new Discord.EmbedBuilder()
  // .setTitle(lang.messages.member.nichname.title)
  // .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true })})
  // .setDescription(lang.messages.member.nichname.description.replace('{member}', member.toString()))
  // .addFields(lang.messages.member.nichname.fields.map(field => ({
  //   name: field.name,
  //   value: field.value
  //     .replace('{oldNickname}', oldNickname)
  //     .replace('{newNickname}', newNickname)
  //   })))
  //   .setTimestamp()
  //   .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
  // return logChannel.send({ embeds: [embed] });
};
