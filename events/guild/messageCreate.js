const Timeout = new Set();
const { EmbedBuilder } = require("discord.js");
const { Prefix } = require("../../config.json");
const humanizeDuration = require("humanize-duration");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.content.toLowerCase().startsWith(Prefix)) return;
  if (!message.member)
    message.member = await message.guild.members.fetch(message.member.id);
  if (!message.guild) return;
  const args = message.content.slice(Prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  const command =
    client.commands.get(cmd) ||
    client.commands.find((x) => x.aliases && x.aliases.includes(cmd));
  if (command) {
    if (command.timeout) {
      if (Timeout.has(`${message.author.id}${command.name}`)) {
        const embed = new EmbedBuilder()
          .setTitle("You are in timeout!")
          .setColor(config.Bot.EmbedColor)
          .setDescription( `:x: You need to wait **${humanizeDuration(command.timeout, {  round: true, })}** to use command again` );
        return message.channel.send({ embeds: [embed] });
      } else {
        command.run(client, message, args);
        Timeout.add(`${message.author.id}${command.name}`);
        setTimeout(() => {
          Timeout.delete(`${message.author.id}${command.name}`);
        }, command.timeout);
      }
    } else {
      command.run(client, message, args);
    }
  }
};
