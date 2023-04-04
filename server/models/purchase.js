'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Purchase.belongsTo(models.User)
      Purchase.belongsTo(models.Book)
    }
  }
  Purchase.init({
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    grandTotal: DataTypes.INTEGER,
    paymentStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Purchase',
  });

  Purchase.beforeCreate((purchase, options) => {
    purchase.total = 1
    purchase.paymentStatus = false
  });

  return Purchase;
};