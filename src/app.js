require("dotenv").config();
const express = require("express");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const { initAuthModule } = require("./module/auth/module");

initAuthModule(app);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send(err.message);
  return;
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at port ${port}`);
});
