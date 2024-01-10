const router = require("express").Router();
const { getDashboardInfo } = require("../controllers/dashboard");

router.get("/get_dashboard_info", getDashboardInfo);

module.exports = router;
