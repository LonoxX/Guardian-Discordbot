const config = require("../../config.json");
const Discord = require("discord.js");
const GuildMember = new Discord.GuildMember(); // This shall be the command author.
const {Collection} = require("discord.js");
const voice = new Collection();
module.exports = async (client, oldState, newState) => {
  const logChannel = client.channels.cache.get(config.Server.LogChannel);
  if (!logChannel) return;

   

  if (!oldState.channel && newState.channel.id === config.Voice.VoiceChannel ){
    let supportRoles = await config.Ticket.SupportRoles.map((x) => {
      return {
        id: x,
        allow: [
          "ViewChannel",
          "SendMessages",
          "Connect",
          "Speak",
          "Stream",
        ],
      };
    });
    const channel = await newState.guild.channels.create({
      name: `${newState.member.user.username}`,
      type: "2", 
      parent: config.Voice.VoiceParent,
      // Team members can see the channel, but not join it without being given permission to speak.
      permissionOverwrites: [
        {
          id: newState.member.id,
          allow: ["ViewChannel", "Connect", "Speak", "Stream"],
        },
        
        {
          id: newState.guild.roles.everyone,
          deny: ["ViewChannel"],
        },
        ...supportRoles,
      ],
      }); 
      newState.member.voice.setChannel(channel);
  }else if (!newState.channel){
    if (oldState.channelID === voice.get(newState.id)){
      if (oldState.channel.parent.id == config.Voice.VoiceParent) {
        console.log(oldState.channel.id)
        if (oldState.channel.id == config.Voice.VoiceChannel) return;
        let membersInChannel = oldState.channel.members.size; 
        if(membersInChannel == 0)  oldState.channel.delete();
      }
    }
  }
  
 


  if ( oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id
  ) {
    const embed = new Discord.EmbedBuilder()
      .setTitle("Voice Channel Switch")
      .setColor(config.Bot.EmbedColor)
      .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.user.displayAvatarURL({ dynamic: true }), })
      .setDescription(  `**${newState.member} moved from \`${oldState.channel.name}\` to \`${newState.channel.name}\`**` )
      .setTimestamp()
      .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
    return logChannel.send({ embeds: [embed] });
  }
  if (!oldState.channel && newState.channel.id) {
    const embed = new Discord.EmbedBuilder()
      .setTitle("Voice Channel Join")
      .setColor(config.Bot.EmbedColor)
      .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.user.displayAvatarURL({ dynamic: true }), })
      .setDescription(  `**🔊 ${newState.member} has joined \`${newState.channel.name}\`**` )
      .setTimestamp()
      .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
    return logChannel.send({ embeds: [embed] });
  }
};
