'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_Trakcer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User_Trakcer.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      })
      User_Trakcer.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  User_Trakcer.init({
    user_id: DataTypes.STRING,
    course_id: DataTypes.STRING,
    last_openede_chapter: DataTypes.INTEGER,
    last_opened_module: DataTypes.INTEGER,
    progress_course: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Trakcer'
  })
  return User_Trakcer
}
