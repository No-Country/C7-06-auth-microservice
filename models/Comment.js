'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
      this.hasOne(models.Pet, {
        foreignKey: 'pet_id',
        sourceKey: 'id'
      });
    }
  }
  Comment.init(
    {
      message: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments'
    }
  );
  return Comment;
};
