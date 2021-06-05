const { fromModelToEntity } = require("../mapper/userMapper");

module.exports = class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async save(user) {
    const newUser = await this.userModel.build(user, {
      isNewRecord: !user.id,
    });

    await newUser.save();

    return fromModelToEntity(newUser);
  }
};
