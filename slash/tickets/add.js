const { MessageActionRow, EmbedBuilder, MessageButton } = require("discord.js");
const config = require('../../config.json');
module.exports = {
    name: 'ticket-add',
    description: "Fügt einen Benutzer zu einem Ticket hinzu",
    options: [
        {
            name: 'user',
            description: 'Benutzer, der hinzugefügt werden soll',
            type: 6,
            required: true,
        },
    ],
    category: 'tickets',
    run: async (interaction, client) => {
        const member = interaction.options.getMember('user');
        if (interaction.channel.name.includes("ticket")) {
            interaction.channel.permissionOverwrites.edit(member.id, {
                ViewChannel: true,
                SendMessages: true,
                AttachFiles: true,
                ManageMessages: true,
                EmbedLinks: true
            });
            const embed = new EmbedBuilder()
            .setTitle("Support Ticket")
            .setDescription(`${member} wurde erfolgreich hinzugefügt!`)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(config.Bot.EmbedColor)
            .setTimestamp()
            .setFooter({ text: `${client.user.username} `,  iconURL: `${client.user.displayAvatarURL()}`, });
            interaction.reply({ embeds: [embed] });
        } else {
            interaction.reply({ content: "Dieser command ist nicht verfügbar in diesem Channel!", ephemeral: true });
        }
    },
};
