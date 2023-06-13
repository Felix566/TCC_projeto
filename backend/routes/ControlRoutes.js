const router = require("express").Router();

const ControlController = require("../controllers/ControlController");

//middlewares
const verifyToken = require("../helpers/verify-token");

router.post("/control", verifyToken, ControlController.control);
router.get("/allControls", ControlController.getAll);
router.get("/:id", ControlController.getControlById);
router.delete("/:id", verifyToken, ControlController.removeControlById);
router.patch("/:id", verifyToken, ControlController.updateControl);

module.exports = router;
