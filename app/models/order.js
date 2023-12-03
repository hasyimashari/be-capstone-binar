'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Order.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      })
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Order.init({
    user_id: DataTypes.UUID,
    course_id: DataTypes.UUID,
    status: DataTypes.ENUM('Sudah Bayar', 'Sudah Bayar'),
    order_method: DataTypes.STRING,
    order_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order'
  })
  return Order
}
