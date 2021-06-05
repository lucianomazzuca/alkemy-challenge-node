class User {
  constructor({
    id,
    name,
    password,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;