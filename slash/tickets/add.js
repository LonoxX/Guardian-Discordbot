const { MessageActionRow, EmbedBuilder, MessageButton } = require("discord.js");
const config = require('../../config.json');
const { getLang } = require('../../handlers/settings.js');
module.exports = {
    name: 'ticketadd',
    description: "Adds a user to a ticket",
    options: [
        {
            name: 'user',
            description: 'User to add to the ticket',
            type: 6,
            required: true,
        },
    ],
    category: 'tickets',
    run: async (interaction, client) => {
        const member = interaction.options.getMember('user');
        const lang = await getLang(interaction.guild);
        if (interaction.channel.name.includes("ticket")) {
            interaction.channel.permissionOverwrites.edit(member.id, {
                ViewChannel: true,
                SendMessages: true,
                AttachFiles: true,
                ManageMessages: true,
                EmbedLinks: true
            });
            const embed = new EmbedBuilder()
            .setTitle(lang.messages.ticket.title)
            .setDescription(lang.messages.ticket.adduser.replace("{user}", member))
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(config.Bot.EmbedColor)
            .setTimestamp()
            .setFooter({ text: `${client.user.username} `,  iconURL: `${client.user.displayAvatarURL()}`, });
            interaction.reply({ embeds: [embed] });
        } else {
            interaction.reply({ content: lang.messages.ticket.ticketerror, ephemeral: true });
        }
    },
};
