const Timeout = new Set();
const config = require("../../config.json");
const db = require("../../handlers/database");
const Ticket = require("../../handlers/ticket.js");
const SGuilds = require("../../handlers/guilds.js");
const { getLang } = require('../../handlers/settings.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const discordTranscripts = require("discord-html-transcripts");
const request = require('request');
module.exports = async (client, interaction) => {
  
  const guild = interaction.guild;
  const guildData = await SGuilds.findOne({ where: { guildId: guild.id  } });
  const logChannel = await client.channels.cache.get(guildData.logchannel);
  const lang = await getLang(guild);
  // Ticket Erstellen
  if (interaction.customId === "create-ticket") {
    const ticketParentCategoryId = guildData.ticketcategory;
    let findTicket = await Ticket.findOne({
      where: {
        guildId: guild.id,
        authorId: interaction.user.id,
        resolved: false,
      },
    }).catch((err) => console.log(err));
    if (findTicket) {
      await interaction.reply({
        content: lang.messages.ticket.hasticket,
        ephemeral: true,
      });
    } else {
      await interaction.reply({ content: lang.messages.ticket.ticketcreatedinprogress,  ephemeral: true, });

      db.authenticate()
      .then(async () => {
        try {

          let ticketCount = await Ticket.max('ticketId', {
            where: { guildId: guild.id },
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
              {
                allow: [ "ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks","ManageMessages",  ],
                id: guildData.supportrole,
              },
            ],
          });

          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel(lang.messages.ticket.buttonlabel)
              .setStyle("4")
              .setEmoji("????")
              .setCustomId("ticket-close"),
          );
  
          const embed = new EmbedBuilder()
            .setTitle(lang.messages.ticket.title)
            .setColor(config.Bot.EmbedColor)
            .setDescription(lang.messages.ticket.description.replace('{username}', `<@!${interaction.user.id}>`))
            .addFields(lang.messages.ticket.fields.map(field => ({
              name: field.name,
              value: field.value
            })))
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp();

          let msg = await createdChannel.send({ content: `||<@&${guildData.supportrole}>||`, embeds: [embed], components: [row], });
          console.log(ticketCount);
          console.log(ticketCount+1);
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
          await interaction.editReply({ content: lang.messages.ticket.ticketcreated.replace('{channel}', `${createdChannel}`), ephemeral: true, });
        } catch (err) {
          console.log(err);
          await interaction.editReply({ content: lang.messages.ticket.error, ephemeral: true, });
        }
      })

    }
  }


  // Ticket-schlie??en
  if ( interaction.customId === "ticket-close" && interaction.channel.name.includes("ticket") ) {
    const channel = interaction.channel;
    const member = interaction.guild.members.cache.get(channel.topic);
    const logchannel = client.channels.cache.get(guildData.logchannel);
    const rowPanel = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
      .setLabel(lang.messages.ticket.buttonlabel)
        .setStyle("4")
        .setEmoji("????")
        .setDisabled(true)
        .setCustomId("ticket-close")
    );
    await interaction.message.edit({ components: [rowPanel] });
    const embed = new EmbedBuilder()
      .setTitle(lang.messages.ticket.close.title)
      .setColor(config.Bot.EmbedColor)
      .setDescription(lang.messages.ticket.close.description.replace('{username}',`<@!${interaction.user.id}>`))
      .setFooter({ text: `${client.user.username} `, iconURL: `${client.user.displayAvatarURL()} `,  })
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
    let tickets = await Ticket.update(
      { resolved: true,  downloadurl: interaction.message.id, },
      { where: { closedMessageId: interaction.message.id, }, }
    );
   
    interaction.channel.permissionOverwrites.edit(member, { ViewChannel: false, });
    setTimeout(async function () {
      const attachment = await discordTranscripts.createTranscript(channel, {
        limit: -1,
        returnType: 'buffer',
        filename : `${channel.name}.html`,
        saveImages: true,
        poweredBy: false
      });
      const crypto = require('crypto');
      const randomString = crypto.randomBytes(16).toString('hex');
      const filename = randomString.match(/.{1,4}/g).join('-') + '.html';
      const formData = {
        file: {
          value: attachment,
          options: {
            filename: filename,
            contentType: 'text/html'
          }
        }
      };

      request.post({
        url: `https://${guildData.uploadhost}/upload.php`,
        formData: formData
      }, function (error, response, body) {
        if (error) throw new Error(error);
      });
      const transcript = new EmbedBuilder()
        .setTitle(lang.messages.ticket.transcript.title.replace('{channel}', `${channel.name}`))
        .setColor(config.Bot.EmbedColor)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true }), })
        .setDescription(lang.messages.ticket.transcript.description.replace('{username}', `<@!${interaction.user.id}>`).replace('{date}', `${new Date().toLocaleDateString()}`).replace('{download}', `[Transcript](https://${guildData.uploadhost}/tickets/${filename})`))
        .setTimestamp()
        .setFooter({ text: `${client.user.username} `,  iconURL: `${client.user.displayAvatarURL()}`, });
      logchannel.send({ embeds: [transcript] }).then((message) => {
        let tickets = Ticket.update( { downloadurl: filename, }, { where: { closedMessageId: interaction.message.id, }, } );
      });
    }, 3000);
    setTimeout(async function () {  channel.delete(); }, 6000);
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
          return interaction.reply({ content: ":x: Nur Entwickler k??nnen diesen Befehl verwenden", ephemeral: true, });
        }
      }
      if (command.ownerOnly) {
        if (interaction.user.id !== interaction.guild.ownerId) {
          return interaction.reply({ content:  "Nur Eigent??mer dieses Servers k??nnen diesen Befehl verwenden", ephemeral: true, });
        }
      }
      command.run(interaction, client);
      Timeout.add(`${interaction.user.id}${command.name}`);
      setTimeout(() => {
        Timeout.delete(`${interaction.user.id}${command.name}`);
      }, command.timeout);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content:  ":x: Beim Ausf??hren dieses Befehls ist ein Fehler aufgetreten!", ephemeral: true, });
    }
  }
};

