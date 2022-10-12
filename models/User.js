'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING
      },
      surname: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: DataTypes.STRING,
      description: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('user', 'admin')
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false
    }
  );
  return User;
};
