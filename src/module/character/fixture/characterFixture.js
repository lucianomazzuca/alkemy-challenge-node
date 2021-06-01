const Character = require('../entity/Character');

module.exports = function createTestCharacter(id) {
  return new Character({
    id,
    name: "Leonard Shelby",
    age: 32,
    weight: 80,
    story: "Former insurance investigator with anterograde amnesia",
    image: 'test'
  });
}