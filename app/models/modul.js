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
      Modul.belongsTo(models.Chapter, {
        foreignKey: 'chapter_id'
      })
    }
  }
  Modul.init({
    chapter_id: DataTypes.UUID,
    modul_name: DataTypes.STRING,
    modul_video: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    is_complate: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Modul'
  })
  return Modul
}
