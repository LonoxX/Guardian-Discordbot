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

module.exports = {
  getLang,
  setTicketChannel
};
// const language = lang?.lang || config.defaultLanguage;
// const langFile = require(`../../languages/${language}.json`);