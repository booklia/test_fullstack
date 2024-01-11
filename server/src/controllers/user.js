const sequelize = require("../sequelizeConfig");
const User = require("../models/user");
const Order = require("../models/order");

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
      }
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
const postUser = async (req, res) => {
  try {
    const { username, age, registration_date } = req.body;
    const order = await User.create({
      username,
      age,
      registration_date,
    });
    res.status(200);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Internal server error", message: error });
  }
};

const changeUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, age, registration_date } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404);
      res.json({ error: "User not found" });
    } else {
      user.username = username || user.username;
      user.age = age || user.age;
      user.registration_date = registration_date || user.registration_date;
      await user.save();
      res.status(200);
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Internal server error", message: error });
  }
};

const removeUserById = async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const user = await Order.findByPk(userId);
    if (!user) {
      res.status(404);
      res.json({ error: "Order not found" });
    } else {
      await Order.destroy({
        where: {
          id: userId,
        },
      });
      res.status(200);
      res.json({ delete_success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Internal server error", message: error });
  }
};

module.exports = {
  getUsersPagination,
  getAllUsers,
  postUser,
  changeUserById,
  removeUserById,
};
