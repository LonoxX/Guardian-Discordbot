const { DataTypes, Model } = require("sequelize");

module.exports = class Ticket extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        guildId: {
          type: DataTypes.STRING,
        },
        ticketId: {
          type: DataTypes.INTEGER,
        },
        channelId: {
          type: DataTypes.STRING,
        },
        resolved: {
          type: DataTypes.BOOLEAN,
        },
        closedMessageId: {
          type: DataTypes.STRING,
        },
        authorId: {
          type: DataTypes.STRING,
        },
        downloadurl: {
          type: DataTypes.STRING,
        },
      },
      {
        tableName: "tickets",
        sequelize,
      }
    );
  }
};
