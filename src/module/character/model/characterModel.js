const { DataTypes, Model } = require("sequelize");

module.exports = class Character extends Model {
  static setup(sequelizeInstance) {
    Character.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        weight: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        story: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        underscored: true,
        tableName: "characters",
        modelName: "Character",
      }
    );

    return Character;
  }

  static setupAssociation(MovieModel){
    Character.belongsToMany(MovieModel, {
      through: 'movies_characters',
      foreignKey: 'character_id',
      as: 'movies',
      uniqueKey: 'id'
    })
  }
};
