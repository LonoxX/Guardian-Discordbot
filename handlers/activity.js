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
        text: {
          type: DataTypes.STRING,
        },
      },
      {
        timestamps: false,
        tableName: "activity",
        sequelize,
      }
    );
  }
};