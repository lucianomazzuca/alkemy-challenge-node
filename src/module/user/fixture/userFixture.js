const User = require("../entity/User");

module.exports = function createTestUser(id) {
  return new User({
    id,
    mail: "test@mail.com",
    password: "test",
  });
};
