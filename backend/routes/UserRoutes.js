const router = require("express").Router();

const UserController = require("../controllers/UserController");

// middleware
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post("/register", UserController.register);
router.post("/", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.get("/", UserController.getAll);
router.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
);
router.delete("/delete/:id", verifyToken, UserController.deleteUser);

module.exports = router;
