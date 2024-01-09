const router = require("express").Router();
const controller = require("../controllers/user");

router.get("/users", controller.getUsersPagination);

router.get("/all_users", controller.getAllUsers);

module.exports = router;
