const router = require("express").Router();
const controller = require("../controllers/order");

router.post("/orders", controller.postOrder);

router.get("/orders", controller.getAllOrders);

router.put("/orders/:id", controller.changeOrderById);

router.delete("/orders/:id", controller.removeOrderById);

module.exports = router;
