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
        prefix: {
          type: DataTypes.STRING,
        },
        lang: {
          type: DataTypes.STRING,
        },
        modLogsChannelId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        joinLogsChannelId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        leaveLogsChannelId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        memberCount: {
          type: DataTypes.INTEGER,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "guilds",
        sequelize,
      }
    );
  }
};
