const { ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
const config = require('../../config.json');
const SGuilds = require("../../handlers/guilds.js");
const { getLang, setTicketChannel } = require('../../handlers/settings.js');
module.exports = {
    name: "ticketsetup",
    description: 'Sends a ticket panel to a channel',
    options: [
        {
            name: 'channel',
            description: 'Channel that the panel should be displayed',
            type: 7,
            channel_types: [0],
        },
        {
            name: 'category',
            description: 'Ticket Category',
            type: 7,
            channel_types: [4],
        },
        {   
            name: 'role',
            description: 'Role that can see the ticket',
            type: 8,
        },
    ],
    timeout: 3000,
    run: async (interaction, client) => {

        const channel = interaction.options.getChannel("channel");
        const category = interaction.options.getChannel("category");
        const role = interaction.options.getRole("role");
        const guild = interaction.guild;
        const lang = await getLang(guild);
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(lang.messages.ticket.title)
                    .setEmoji("🎟️")
                    .setStyle("2")
                    .setCustomId("create-ticket")
            );
        const embed = new EmbedBuilder()
            .setTitle(`${guild.name} - ${lang.messages.ticket.title}`, client.user.displayAvatarURL())
            .setColor(config.Bot.EmbedColor)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(lang.messages.ticket.panneldescription)
            .setTimestamp()
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });

        interaction.reply({ content: lang.messages.ticket.panelSuccess.replace("{channel}", channel), ephemeral: true });
        setTicketChannel(guild.id, channel.id, category.id, role.id);
        return channel.send({ embeds: [embed], components: [row] });
    }
};
