'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasOne(models.OTP, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    no_tel: DataTypes.STRING,
    password: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    photo: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'member')
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
