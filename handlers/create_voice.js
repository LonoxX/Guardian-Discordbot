const { DataTypes, Model } = require("sequelize");

module.exports = class guilds extends Model {
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
        guildchannelamount: {
          type: DataTypes.INTEGER,
        },
        channelid: {
          type: DataTypes.STRING,
        },
        channelparentid: {
          type: DataTypes.STRING,
        },
      },
      {
        timestamps: false,
        tableName: "create_voice",
        sequelize,
      }
    );
  }
};
