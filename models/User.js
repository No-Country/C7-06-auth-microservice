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
      this.hasMany(models.Pet, {
        foreignKey: 'user_id',
        sourceKey: 'id'
      });
    }
    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
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
      avatar: DataTypes.STRING,
      role: {
        allowNull: false,
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
