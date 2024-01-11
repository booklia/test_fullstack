const router = require("express").Router();
const controller = require("../controllers/user");

router.get("/users", controller.getUsersPagination);

router.get("/all_users", controller.getAllUsers);

router.post("/all_users", controller.postUser);

router.put("/all_users/:id", controller.changeUserById);

router.delete("/all_users/:id", controller.removeUserById);

module.exports = router;
