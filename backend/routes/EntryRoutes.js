const router = require("express").Router();

const EntryController = require("../controllers/EntryController");

//middlewares
const verifyToken = require("../helpers/verify-token");

router.post("/createInput", verifyToken, EntryController.createInput);
router.get("/inputs", EntryController.getEntries);
router.get("/:id", EntryController.getEntrieById);
router.delete("/:id", verifyToken, EntryController.removeEntrieById);
router.patch("/:id", verifyToken, EntryController.updateEntrie);

module.exports = router;
