'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id'
      });
    }
  }
  Pet.init(
    {
      age: DataTypes.INTEGER,
      animal_type: DataTypes.STRING,
      description: DataTypes.STRING,
      gender: DataTypes.STRING,
      pure_race: DataTypes.BOOLEAN,
      race: DataTypes.STRING,
      size: DataTypes.STRING,
      vaccinations_up_to_date: DataTypes.BOOLEAN,
      location_id: DataTypes.BIGINT,
      user_id: DataTypes.BIGINT,
      name: DataTypes.STRING,
      weight: DataTypes.DOUBLE
    },
    {
      sequelize,
      modelName: 'Pet',
      tableName: 'pets',
      timestamps: false
    }
  );
  return Pet;
};
