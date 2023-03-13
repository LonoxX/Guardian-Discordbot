const config = require("../../config.json");
const db = require("../../handlers/database.js");
const Ticket = require("../../handlers/ticket.js");
const SGuilds = require("../../handlers/guilds.js");
const Activity = require("../../handlers/activity.js");
const create_voice = require("../../handlers/create_voice.js");
const { addGuild } = require('../../handlers/settings.js');
const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  setInterval(() => {
    const activities = [
      { text: "" + Math.ceil(client.guilds.cache.size) + " Server." },
    ];
    let activity;
    db.authenticate()
      .then(async () => {
        const messages = await Activity.findAll({
          attributes: ['text'],
          raw: true,
        });
        messages.forEach(message => {
          activities.push({ text: message.text });
        });
        activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.text, { type: ActivityType.Playing});
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }, 10000);
    
console.log(`[Discord API] Logged in as ${client.user.tag}`);
db.authenticate()
  .then(() => {
    Ticket.init(db);
    Ticket.sync();
    SGuilds.init(db);
    SGuilds.sync();
    Activity.init(db);
    Activity.sync();
    create_voice.init(db);
    create_voice.sync();
    console.log("[Database] Connection has been established successfully.");
  })
  .then(async () => {
    setTimeout(async function () {
      client.guilds.cache.forEach(guild => {
        addGuild(guild);
      });
    }, 3000);
  })
  .catch((error) => {
    console.error("[Database] Unable to connect to the database:", error);
  });

};