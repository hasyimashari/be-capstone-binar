'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Course.hasMany(models.Modul, {
        foreignKey: 'course_id'
      })
      Course.belongsTo(models.Category, {
        foreignKey: 'category_id'
      })
    }
  }
  Course.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    level: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    category_id: DataTypes.UUID,
    facilitator: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    type: DataTypes.ENUM('Premium', 'Free'),
    description: DataTypes.STRING,
    target_audience: DataTypes.STRING,
    telegram_group: DataTypes.STRING,
    on_boarding: DataTypes.STRING,
    introduction_video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course'
  })
  return Course
}
