const User = require("../entity/User");

module.exports = function createTestUser(id) {
  return new User({
    id,
    name: "Test",
    password: "test",
  });
};
