const { Sequelize } = require("sequelize");
const config = require("../config.json");
module.exports = new Sequelize(config.Database.Tablename, config.Database.Username, config.Database.Password, {
  dialect: "mysql",
  host: config.Database.Hostname,
  logging: false,
});
