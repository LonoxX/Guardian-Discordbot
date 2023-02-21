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
        logchannel: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        joinchannel: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        leavechannel: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ticketchannel: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ticketcategory: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        supportrole: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        membercount: {
          type: DataTypes.INTEGER,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        uploadhost: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        timestamps: false,
        tableName: "guilds",
        sequelize,
      }
    );
  }
};
