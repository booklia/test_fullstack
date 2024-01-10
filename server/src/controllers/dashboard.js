const sequelize = require("../sequelizeConfig");

const getDashboardInfo = async (req, res) => {
  try {
    const { date } = req.query;
    const [ordersCountWeek] = await sequelize.query(
      `
          SELECT
            COUNT(id) AS order_count
          FROM orders
          WHERE order_date BETWEEN '2022-04-01' AND '2022-04-07'
          `,
      {
        replacements: { date },
      }
    );
    const [usersCountMadeOrders] = await sequelize.query(
      `
          SELECT
            COUNT(DISTINCT user_id) AS user_count
          FROM orders
          WHERE order_date BETWEEN '2022-04-01' AND '2022-04-07';
          `,
      {
        replacements: { date },
      }
    );
    const [revenue] = await sequelize.query(
      `
          SELECT
            SUM(order_amount) AS total_profit
          FROM orders
          WHERE order_date BETWEEN '2022-04-01' AND '2022-04-07'
          `,
      {
        replacements: { date },
      }
    );
    const [revenueDaily] = await sequelize.query(
      `
          SELECT
            DATE(order_date) AS order_day,
            SUM(order_amount) AS daily_profit
          FROM orders
          WHERE order_date BETWEEN '2022-04-01' AND '2022-04-07'
          GROUP BY order_day
          ORDER BY order_day;
          `,
      {
        replacements: { date },
      }
    );
    const [usersDaily] = await sequelize.query(
      `
          SELECT
            DATE(orders.order_date) AS order_day,
            COUNT(DISTINCT users.id) AS user_count
          FROM orders
          JOIN users ON orders.user_id = users.id
          WHERE order_date BETWEEN '2022-04-01' AND '2022-04-07'
          GROUP BY order_day
          ORDER BY order_day;
          `,
      {
        replacements: { date },
      }
    );

    res.status(200);
    res.json({
      ordersCountWeek,
      usersCountMadeOrders,
      revenue,
      revenueDaily,
      usersDaily,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Internal server error", message: error });
  }
};

module.exports = { getDashboardInfo };
