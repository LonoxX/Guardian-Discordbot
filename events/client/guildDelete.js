const config = require("../../config.json");
const Discord = require("discord.js");
const db = require("../../handlers/database.js");
const SGuilds = require("../../handlers/guilds.js");

module.exports = async (client, guild) => {
  const server = await SGuilds.findOne({
    where: {
      guildId: guild.id
    }
  });
  if (server) {
    SGuilds.destroy({
        where: {
          guildId: guild.id
        }
      })
      .then(() => {
        console.log(`[Database] Removed Server (${guild.id}) from the database`);
      })
      .catch((error) => {
        console.error(`[Database] Failed to remove Server(${guild.id}) from the database: ${error}`);
      });
  }

  console.log("Guardian has left a server: " + guild.name);
};