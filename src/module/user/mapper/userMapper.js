const User = require('../entity/User');

function fromModelToEntity({
  id,
  mail,
  password,
  createdAt,
  udpatedAt
}) {
  return new User({
    id,
    mail,
    password,
    createdAt,
    udpatedAt,
  })
};

function fromFormToEntity({
  id,
  mail,
  password,
  createdAt,
  udpatedAt
}) {
  return new User({
    id,
    mail,
    password,
    createdAt,
    udpatedAt,
  })
};

module.exports = { fromModelToEntity, fromFormToEntity };