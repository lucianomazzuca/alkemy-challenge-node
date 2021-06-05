const User = require('../entity/User');

function fromModelToEntity({
  id,
  name,
  password,
  createdAt,
  udpatedAt
}) {
  return new User({
    id,
    name,
    password,
    createdAt,
    udpatedAt,
  })
};

function fromFormToEntity({
  id,
  name,
  password,
  createdAt,
  udpatedAt
}) {
  return new User({
    id,
    name,
    password,
    createdAt,
    udpatedAt,
  })
};

module.exports = { fromModelToEntity, fromFormToEntity };