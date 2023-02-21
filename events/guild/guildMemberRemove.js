const config = require("../../config.json");
module.exports = async (client, member) => {
  const channel = client.channels.cache.get(config.Server.LogChannel);
  if (!channel) return;
  channel.send({
    content: `👋 **${member} hat den Server verlasse  ${member.guild.name}**\n\n**aktuellen mitglieder:** #${member.guild.membercount}`,
  });

  // Todo: Update To Embed Message
};
