'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      payment.belongsTo(models.UserMaster, {
        foreignKey: 'student_id',
        as: 'user_payment'
      });
    }
  }
  payment.init({
    student_id: DataTypes.INTEGER,
    courses: DataTypes.TEXT,
    amount: DataTypes.STRING,
    payment_mode: DataTypes.STRING,
    transiction_id: DataTypes.INTEGER,
    bill_mobile: DataTypes.INTEGER,
    bill_name: DataTypes.STRING,
    bill_address: DataTypes.STRING,
    bill_gst: DataTypes.STRING,
    bill_pan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};