const NotFountError = require("../../../shared/error/NotFoundError");
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

  async getById(id) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFountError(`User with id ${id} was not found`);
    }

    return fromModelToEntity(user);
  }

  async getByName(name) {
    const user = await this.userModel.findOne({ where: { name } });

    if (!user) {
      return null;
    }

    return fromModelToEntity(user);
  }
};
