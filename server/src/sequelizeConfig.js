const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  username: "postgres",
  password: "123",
  database: "test",
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

sequelize.sync().then(() => {
  console.log("data synced");
});

module.exports = sequelize;
