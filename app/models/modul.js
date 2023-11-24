'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Modul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Modul.belongsTo(models.Course, {
        foreignKey: 'course_id'
      })
    }
  }
  Modul.init({
    course_id: DataTypes.UUID,
    code_course: DataTypes.STRING,
    name: DataTypes.STRING,
    materi: DataTypes.STRING,
    video: DataTypes.STRING,
    isComplate: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    chapter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Modul'
  })
  return Modul
}
