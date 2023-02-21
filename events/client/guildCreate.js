const config = require("../../config.json");
const Discord = require("discord.js");
const db = require("../../handlers/database.js");
const SGuilds = require("../../handlers/guilds.js");
module.exports = async (client, guild) => {

  const guilds = client.guilds.cache;
  if (guilds) {
    for (const guild of guilds.values()) {
      const server = await SGuilds.findOne({
        where: {
          guildId: guild.id
        }
      });
      if (!server) {
        SGuilds.create({
            guildId: guild.id,
            prefix: config.Bot.Prefix,
            lang: "en",
            modLogsChannelId: null,
            joinchannel: null,
            leavechannel: null,
            membercount: guild.membercount,
            created_at: new Date(),
          })
          .then(() => {
            console.log(`[Database] Added Server (${guild.id}) to the database`);
          })
          .catch((error) => {
            console.error(`[Database] Failed to add Server(${guild.id}) to the database: ${error}`);
          });
      }
    }
  }

  console.log("Guardian has joined a new server: " + guild.name);

};