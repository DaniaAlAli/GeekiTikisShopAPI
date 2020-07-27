const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "daaasja93",
  database: "mugstore_db",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
