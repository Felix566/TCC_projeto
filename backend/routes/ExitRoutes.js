const router = require("express").Router();

const ExitController = require("../controllers/ExitController");

//middlewares
const verifyToken = require("../helpers/verify-token");

router.post("/createOutput", verifyToken, ExitController.createOutput);
router.get("/outputs", ExitController.getExits);
router.get("/:id", ExitController.getExitById);
router.delete("/:id", verifyToken, ExitController.removeExiteById);
router.patch("/:id", verifyToken, ExitController.updateExit);

module.exports = router;
