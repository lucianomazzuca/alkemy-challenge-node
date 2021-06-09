const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static setup(sequelizeInstance) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        mail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "User",
        tableName: "users",
        underscored: true,
      }
    );

    return User;
  }
}

module.exports = User;
