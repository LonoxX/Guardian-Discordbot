const { ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
const config = require('../../config.json');
const SGuilds = require("../../handlers/guilds.js");
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
            description: 'ticket Category',
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
    category: 'team',
    ownerOnly: true,
    run: async (interaction, client) => {
        const channel = interaction.options.getChannel("channel");
        const category = interaction.options.getChannel("category");
        const role = interaction.options.getRole("role");
        const guild = interaction.guild;
        async function setTicketChannel(serverId, channelId, categoryId) {
            let tickets = await SGuilds.update(
                { ticketchannel: channelId, ticketcategory: categoryId, supportrole: role.id, },
                { where: { guildId: serverId, }, }
            );
        }
        console.log(role.id);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Ticket erstellen")
                    .setEmoji("🎟️")
                    .setStyle("2")
                    .setCustomId("create-ticket")
            );

        const embed = new EmbedBuilder()
            .setTitle(`${guild.name} - Support`, client.user.displayAvatarURL())
            .setColor(config.Bot.EmbedColor)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("Um ein Ticket zu erstellen reagiere mit 🎟️")
            .setTimestamp()
            .setFooter({
                text: `${client.user.username}`,
                iconURL: `${client.user.displayAvatarURL()}`,
            });

        interaction.reply({ content: `Ticket Panel Erfolg in ${channel}! senden gesendet`, ephemeral: true });
        setTicketChannel(guild.id, channel.id, category.id);
        return channel.send({ embeds: [embed], components: [row] });
    }
};
