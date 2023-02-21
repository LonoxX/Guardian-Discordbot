const Timeout = new Set();
const config = require("../../config.json");
const db = require("../../handlers/database");
const Ticket = require("../../handlers/ticket.js");
const SGuilds = require("../../handlers/guilds.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports = async (client, interaction) => {
  // Ticket Erstellen
  if (interaction.customId === "create-ticket") {
    let guild = await interaction.guild;
    let findTicket = await Ticket.findOne({
      where: {
        guildId: guild.id,
        authorId: interaction.user.id,
        resolved: false,
      },
    }).catch((err) => console.log(err));
    if (findTicket) {
      await interaction.reply({
        content: `Du hast bereits ein Ticket erstellt.Bitte warte auf eine Antwort von einem Support-Team.`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({ content: `Ticket wird erstellt ....`,  ephemeral: true, });

      db.authenticate()
      .then(async () => {
        try {
          const guildData = await SGuilds.findOne({ where: { guildId: guild.id } });
          const ticketParentCategoryId = guildData.ticketCategoryId;
          let ticketCount = await Ticket.count({
            where: {
              guildId: guild.id,
            },
          });
          const createdChannel = await interaction.guild.channels.create({
            name: "ticket",
            type: "0",
            topic: `${interaction.user.id} `,
            parent: ticketParentCategoryId,
            permissionOverwrites: [
              {
                allow: [ "ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks",  ],
                id: interaction.user.id,
              },
              {
                deny: "ViewChannel",
                id: interaction.guild.id,
              },
            ],
          });       
          let msg = await createdChannel.send({ content: `dd`,});

          let newTicket = await Ticket.create({
            authorId: interaction.user.id,
            channelId: createdChannel.id,
            ticketId: ticketCount+1,
            guildId: guild.id,
            resolved: false,
            downloadurl: null,
            closedMessageId: msg.id,
          });   
          let ticketId = String(newTicket.dataValues.ticketId).padStart(4, "0");
          createdChannel.edit({ name: `ticket-${ticketId}` });
          await interaction.editReply({ content: `Ticket erfolgreich erstellt ${createdChannel} !`, ephemeral: true, });
        } catch (err) {
          console.log(err);
          await interaction.editReply({ content: `Ein Fehler ist aufgetreten.`, ephemeral: true, });
        }
      })

    }
  }

  // Sonstiges
  if (interaction.type === 2) {
    if (!client.slash.has(interaction.commandName)) return;
    if (!interaction.guild) return;
    const command = client.slash.get(interaction.commandName);
    try {
      if (command.timeout) {
        if (Timeout.has(`${interaction.user.id}${command.name} `)) {
          const embed = new EmbedBuilder()
            .setTitle("Du befindest dich im einem Timeout!")
            .setDescription( `Du must noch ** ${humanizeDuration(command.timeout, { round: true,  })}** warten um den Befehl erneut zu verwenden` )
            .setColor(config.Bot.EmbedColor);
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }
      if (command.permissions) {
        if (!interaction.member.permissions.has(command.permissions)) {
          const embed = new EmbedBuilder()
            .setTitle("Fehlende Berechtigung")
            .setColor(config.Bot.EmbedColor)
            .setDescription(  `: x: Du brauchst \`${command.permissions}\` um diesen Befehl zu verwenden` )
            .setTimestamp()
            .setFooter({ stext: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`, });
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }
      if (command.devs) {
        if (!config.Bot.OwnersID.includes(interaction.user.id)) {
          return interaction.reply({ content: ":x: Nur Entwickler können diesen Befehl verwenden", ephemeral: true, });
        }
      }
      if (command.ownerOnly) {
        if (interaction.user.id !== interaction.guild.ownerId) {
          return interaction.reply({ content:  "Nur Eigentümer dieses Servers können diesen Befehl verwenden", ephemeral: true, });
        }
      }
      command.run(interaction, client);
      Timeout.add(`${interaction.user.id}${command.name}`);
      setTimeout(() => {
        Timeout.delete(`${interaction.user.id}${command.name}`);
      }, command.timeout);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content:  ":x: Beim Ausführen dieses Befehls ist ein Fehler aufgetreten!", ephemeral: true, });
    }
  }
};

