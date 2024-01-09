const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://postgres:123@localhost:5432/test", {
  define: {
    timestamps: false,
  },
});

sequelize.sync().then(() => {
  console.log("data synced");
});

module.exports = sequelize;
