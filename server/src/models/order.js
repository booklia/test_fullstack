const { DataTypes } = require("sequelize");
const sequelize = require("../sequelizeConfig");

const Order = sequelize.define("order", {
  order_amount: {
    type: DataTypes.DECIMAL,
  },
  order_date: {
    type: DataTypes.DATE,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_comment: {
    type: DataTypes.STRING(255),
  },
});
Order.belongsTo(sequelize.models.user, {
  foreignKey: "user_id",
});
module.exports = Order;
