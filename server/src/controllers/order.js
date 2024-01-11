const Order = require("../models/order");
const postOrder = async (req, res) => {
  try {
    const { user_id, order_amount, order_date, order_comment } = req.body;
    const order = await Order.create({
      user_id,
      order_amount,
      order_date,
      order_comment,
    });
    res.status(200);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Internal server error", message: error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200);
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Internal server error", message: error });
  }
};

const changeOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { user_id, order_amount, order_date, order_comment } = req.body;
    const order = await Order.findByPk(orderId);
    if (!order) {
      res.status(404);
      res.json({ error: "Order not found" });
    } else {
      order.user_id = user_id || order.user_id;
      order.order_amount = order_amount || order.order_amount;
      order.order_date = order_date || order.order_date;
      order.order_comment = order_comment || order.order_comment;

      await order.save();
      res.status(200);
      res.json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Internal server error", message: error });
  }
};

const removeOrderById = async (req, res) => {
  try {
    const orderId = Number.parseInt(req.params.id);
    const order = await Order.findByPk(orderId);
    console.log(order);
    if (!order) {
      res.status(404);
      res.json({ error: "Order not found" });
    } else {
      await Order.destroy({
        where: {
          id: orderId,
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

module.exports = { postOrder, getAllOrders, changeOrderById, removeOrderById };
