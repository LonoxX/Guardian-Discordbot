const SGuilds = require("./guilds.js");
const config = require("../config.json");

async function getLang(guild) {
  const lang = await SGuilds.findOne({
    where: {
      guildId: guild.id
    },
    attributes: ['lang']
  });
  const langFile = require(`../languages/${lang.lang}.json`);
  return {
    code: lang.lang,
    messages: langFile
  };
}

async function setTicketChannel(serverId, channelId, categoryId,supportrole) {
  let tickets = await SGuilds.update({
    ticketchannel: channelId,
    ticketcategory: categoryId,
    supportrole: supportrole,
  }, {
    where: {
      guildId: serverId,
    },
  });
}

async function addGuild(guild) {
  const server = await SGuilds.findOne({
    where: {
      guildId: guild.id
    }
  });
  if (!server) {
    await SGuilds.create({
      guildId: guild.id,
      prefix: config.Bot.Prefix,
      lang: "en",
      modLogsChannelId: null,
      joinchannel: null,
      leavechannel: null,
      ticketChannelId: null,
      ticketcategory: null,
      membercount: guild.memberCount,
      uploadhost: "pandaserver.de",
      created_at: new Date(),
    });
    console.log(`[Database] Added Guild (${guild.id}) to the database`);
  }
}

async function removeGuild(guild) {
  const server = await SGuilds.findOne({
    where: {
      guildId: guild.id
    }
  });
  if (server) {
    await SGuilds.destroy({
      where: {
        guildId: guild.id
      }
    });
    console.log(`[Database] Removed Guild (${guild.id}) from the database`);
  }
}
module.exports = {
  getLang,
  setTicketChannel,
  addGuild,
  removeGuild
};