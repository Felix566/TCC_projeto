const router = require("express").Router();

const BloodController = require("../controllers/BloodController");

// middlewares
const verifyToken = require("../helpers/verify-token");

router.post("/create", verifyToken, BloodController.create);
router.get("/", BloodController.getAll);
router.get("/:id", BloodController.getBloodById);
router.delete("/:id", verifyToken, BloodController.removeBloodById);
router.patch("/:id", verifyToken, BloodController.updateBlood);

module.exports = router;
