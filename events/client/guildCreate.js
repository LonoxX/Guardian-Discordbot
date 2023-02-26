const config = require("../../config.json");
const Discord = require("discord.js");
const { addGuild } = require('../../handlers/settings.js');
module.exports = async (client, guild) => {
  addGuild(guild);
  console.log(`${client.user.tag} has joined a new server: ${guild.name} (${guild.id})`);

  // TODO: Setup a Default Log Channel with a Default Name "logs" and sende a Embed Message to the Channel
  
};
