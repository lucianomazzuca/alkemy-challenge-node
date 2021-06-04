const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize("sqlite::memory", { logging: false });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "postgres",
    }
  );
}

module.exports = sequelize;
