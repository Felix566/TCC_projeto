const router = require("express").Router();

const BloodController = require("../controllers/BloodController");

// middlewares
const verifyToken = require("../helpers/verify-token");

router.post("/create", verifyToken, BloodController.create);
router.get("/", BloodController.getAll);

module.exports = router;
