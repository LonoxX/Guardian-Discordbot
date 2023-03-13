const config = require("../../config.json");
const Discord = require("discord.js");
const SGuilds = require("../../handlers/guilds.js");
const create_voice = require("../../handlers/create_voice.js");
const { getLang } = require('../../handlers/settings.js');
module.exports = async (client, oldState, newState) => {
  const guild = oldState.guild;
  const voice = await create_voice.findOne({ where: { guildId: guild.id } });
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);


  console.log(`voiceStateUpdate:  | ${newState.channel.parent.id }`);

    if (newState.channelId === voice.channelid ) {
      if (voice.guildId === guild.id) {
        const channel = await newState.guild.channels.create({
          name: `${newState.member.user.username}`,
          type: "2", 
          parent: voice.channelparentid,
          permissionOverwrites: [
            {
              id: newState.member.id,
              allow: ["ViewChannel", "Connect", "Speak", "Stream"],
            },
            {
              id: newState.guild.roles.everyone,
              deny: ["ViewChannel"],
            }
          ],
        }); 
        newState.member.voice.setChannel(channel);
      }
    }
  if (oldState.channel.parent.id === voice.channelparentid) {
    if (oldState.channel.id == voice.channelid) return;
      if (oldState.channel.members.size == 0 ) {
        console.log("Members in channel: " + oldState.channel.members.size)
        oldState.channel.delete();
      }
  }
    
  }
//   if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
//     console.log(`${newState.member} moved from ${oldState.channel.name} to ${newState.channel.name}`)
// }




//   if (!logChannel) return;
//   if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
//     const embed = new Discord.EmbedBuilder()
//     .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.user.displayAvatarURL({ dynamic: true }) })
//     .setTimestamp()
//   .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
//     .setDescription(`**${newState.member} moved from \`${oldState.channel.name}\` to \`${newState.channel.name}\`**`)
//     return logChannel.send({ embeds: [embed] })
// }
//   if (!oldState.channel.id && newState.channel.id) {
//       const embed = new Discord.EmbedBuilder()
//       .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.user.displayAvatarURL({ dynamic: true }) })
//       .setTimestamp()
//       .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
//       .setDescription(`**🔊 ${newState.member} has joined \`${newState.channel.name}\` channel.**`)
//       return logChannel.send({ embeds: [embed] })
//   }
