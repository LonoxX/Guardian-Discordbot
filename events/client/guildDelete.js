const config = require("../../config.json");
const Discord = require("discord.js");
const { removeGuild } = require('../../handlers/settings.js');
module.exports = async (client, guild) => {
  removeGuild(guild);
  console.log(`${client.user.tag} has left a server: ${guild.name} (${guild.id})`);
};