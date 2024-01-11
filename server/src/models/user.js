const { DataTypes } = require("sequelize");
const sequelize = require("../sequelizeConfig");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  registration_date: {
    type: DataTypes.DATE,
  },
  credit: {
    type: DataTypes.DECIMAL,
  },
});

module.exports = User;
