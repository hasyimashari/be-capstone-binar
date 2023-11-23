'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Chapter.belongsTo(models.Class, {
        foreignKey: 'class_id'
      })
      Chapter.hasMany(models.Modul, {
        foreignKey: 'chapter_id'
      })
    }
  }
  Chapter.init({
    class_id: DataTypes.UUID,
    chapter_number: DataTypes.INTEGER,
    chapter_title: DataTypes.STRING,
    is_locked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Chapter'
  })
  return Chapter
}
