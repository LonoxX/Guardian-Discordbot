const config = require("../../config.json");
const db = require("../../handlers/database.js");
const Ticket = require("../../handlers/ticket.js");
const SGuilds = require("../../handlers/guilds.js");
const { ActivityType } = require("discord.js");
const { timeout } = require("../../slash/tickets/ticketsetup");

module.exports = async (client) => {
  setInterval(() => {
    var activities = [
      { text: "Version " + config.Bot.Version },
    ];
    try {
      const activity = activities[Math.floor(Math.random() * activities.length)]; client.user.setActivity(activity.text, { type: ActivityType.Streaming,  url: "https://www.twitch.tv/LonoxX_", });
    } catch (err) {
      return;
    }
  }, 10000);
    
console.log(`[Discord API] Logged in as ${client.user.tag}`);
db.authenticate()
  .then(() => {
    Ticket.init(db);
    Ticket.sync();
    SGuilds.init(db);
    SGuilds.sync();
    console.log("[Database] Connection has been established successfully.");
  })
  .then(async () => {
    setTimeout(async function () {
    const guilds = client.guilds.cache;
      if (guilds) {
        for (const guild of guilds.values()) {
          const server = await SGuilds.findOne({ where: { guildId: guild.id } });
          if (!server) {
            SGuilds.create({
              guildId: guild.id,
              prefix: config.Bot.Prefix,
              lang: "en",
              modLogsChannelId: null,
              joinLogsChannelId: null,
              leaveLogsChannelId: null,
              ticketChannelId: null,
              ticketCategoryId: null,
              memberCount: guild.memberCount,
              created_at: new Date(),  
            })
              .then(() => {
                console.log(`[Database] Added server(${guild.id}) to the database`);
              })
              .catch((error) => {
                console.error(`[Database] Failed to add server(${guild.id}) to the database: ${error}`);
              });
          }
        }
      }
    }, 3000);
    
  })
  .catch((error) => {
    console.error("[Database] Unable to connect to the database:", error);
  });

};