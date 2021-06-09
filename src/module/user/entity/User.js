class User {
  constructor({
    id,
    mail,
    password,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.mail = mail;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;