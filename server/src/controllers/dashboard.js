const sequelize = require("../sequelizeConfig");

const getDashboardInfo = async (req, res) => {
  try {
    const { date } = req.query;
    let startDate;
    let endDate;
    if (date) {
      endDate = new Date();
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 7);
      startDate = startDate.toISOString();
      endDate = endDate.toISOString();
    } else {
      startDate = "2022-04-01";
      endDate = "2022-04-07";
    }
    const [ordersCountWeek] = await sequelize.query(
      `
          SELECT
            COUNT(id) AS order_count
          FROM orders
          WHERE order_date BETWEEN :startDate AND :endDate
          `,
      {
        replacements: { startDate, endDate },
      }
    );
    const [usersCountMadeOrders] = await sequelize.query(
      `
          SELECT
            COUNT(DISTINCT user_id) AS user_count
          FROM orders
          WHERE order_date BETWEEN :startDate AND :endDate
          `,
      {
        replacements: { startDate, endDate },
      }
    );
    const [revenue] = await sequelize.query(
      `
          SELECT
            SUM(order_amount) AS total_profit
          FROM orders
          WHERE order_date BETWEEN :startDate AND :endDate
          `,
      {
        replacements: { startDate, endDate },
      }
    );
    const [revenueDaily] = await sequelize.query(
      `
          SELECT
            DATE(order_date) AS order_day,
            SUM(order_amount) AS daily_profit
          FROM orders
          WHERE order_date BETWEEN :startDate AND :endDate
          GROUP BY order_day
          ORDER BY order_day;
          `,
      {
        replacements: { startDate, endDate },
      }
    );
    const [usersDaily] = await sequelize.query(
      `
          SELECT
            DATE(orders.order_date) AS order_day,
            COUNT(DISTINCT users.id) AS user_count
          FROM orders
          JOIN users ON orders.user_id = users.id
          WHERE order_date BETWEEN :startDate AND :endDate
          GROUP BY order_day
          ORDER BY order_day;
          `,
      {
        replacements: { startDate, endDate },
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
