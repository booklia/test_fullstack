const sequelize = require("../sequelizeConfig");
const User = require("../models/user");

const getUsersPagination = async (req, res) => {
  try {
    const { page = 1, perPage = 5 } = req.query;
    const offset = (page - 1) * perPage;
    const [users, meta] = await sequelize.query(
      `
          SELECT * from users
                ORDER BY id
                OFFSET :offset
                LIMIT :perPage
          `,
      {
        replacements: { offset, perPage },
      },
    );
    res.status(200);
    res.json({ users, meta: { page, perPage, totalItems: meta.rowCount } });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Internal server error", message: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Internal server error", message: error });
  }
};

module.exports = { getUsersPagination, getAllUsers };
