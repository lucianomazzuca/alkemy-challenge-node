"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("movies", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      release_date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      score: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.createTable("characters", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      story: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.createTable("genres", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.createTable("movies_characters", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      movie_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "movies",
          },
          key: "id",
        },
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      character_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "characters",
          },
          key: "id",
        },
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.createTable("movies_genres", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      movie_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "movies",
          },
          key: "id",
        },
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      genre_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "genres",
          },
          key: "id",
        },
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
  },
};
