const router = require("express").Router();

const BloodController = require("../controllers/BloodController");

router.post("/create", BloodController.create);

module.exports = router;
