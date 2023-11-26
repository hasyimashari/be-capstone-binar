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
    course_code: DataTypes.STRING,
    module_name: DataTypes.STRING,
    module_number: DataTypes.INTEGER,
    module_video: DataTypes.STRING,
    is_complete: DataTypes.BOOLEAN,
    is_locked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Modul'
  })
  return Modul
}
