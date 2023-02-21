const config = require("../../config.json");
module.exports = async (client, member) => {
  const channel = client.channels.cache.get(config.Server.WelcomeChannel);
  if (!channel) return;
  channel.send({
    content: `Herzlich Willkommen <@${member.user.id}> , auf ***${member.guild.name}***! für weitere Informationen schaue dir bitte <#603793628103573505> an. `
  });

  // Todo: Update To Embed Message
};
