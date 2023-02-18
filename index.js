const Discord = require("discord.js");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { readdirSync } = require("fs");
const path = require("path");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.GuildMember],
});
const config = require("./config.json");
client.commands = new Discord.Collection();
client.slash = new Discord.Collection();


const commands = [];
readdirSync("./slash/").map(async (dir) => {
  readdirSync(`./slash/${dir}/`).map(async (cmd) => {
    commands.push(require(path.join(__dirname, `./slash/${dir}/${cmd}`)));
  });
});
const rest = new REST({ version: "10" }).setToken(config.Bot.Token);

(async () => {
  try {
    await rest.put( Routes.applicationGuildCommands(config.Bot.BotID, config.Server.ServerID), { body: commands } );
  } 
  catch (error) { console.error(error); }
})();


client.login(config.Bot.Token);

["handlers", "events", "slash"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err}`);
});

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err}`);
});