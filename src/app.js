require("dotenv").config();
const express = require("express");
const sequelize = require('./config/sequelize');

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

async function testSequelize() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// testSequelize()

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at port ${port}`);
});
