'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Class.hasMany(models.Chapter, {
        foreignKey: 'class_id'
      })
    }
  }
  Class.init({
    class_code: DataTypes.STRING,
    level: DataTypes.ENUM('beginer', 'intermediate', 'advanced'),
    category_id: DataTypes.STRING,
    facilitator: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    type: DataTypes.ENUM('premium', 'free'),
    class_description: DataTypes.STRING,
    class_target: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Class'
  })
  return Class
}
