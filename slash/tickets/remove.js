const { MessageActionRow, EmbedBuilder, MessageButton } = require("discord.js");
const config = require('../../config.json');
module.exports = {
    name: 'ticket-remove',
    description: "Entfernt einen Benutzer von einem Ticket",
    options: [
        {
            name: 'user',
            description: 'Benutzer, der entfernt werden soll',
            type: 6,
            required: true,
        },
    ],
    category: 'tickets',
    run: async (interaction, client) => {
        const member = interaction.options.getMember('user');
        if (interaction.channel.name.includes("ticket")) {
            interaction.channel.permissionOverwrites.edit(member.id, {
                ViewChannel: false,
                SendMessages: false,
                AttachFiles: false,
                ManageMessages: false,
                EmbedLinks: false
            });
            const embed = new EmbedBuilder()
            .setTitle("Support Ticket")
            .setDescription(`${member} wurde erfolgreich entfernt!`)
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
