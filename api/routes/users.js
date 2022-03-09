const router = require("express").Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController.js");

// update user
router.put("/:id", auth, userController.updateUser);

// delete user
router.delete("/:id", auth, userController.deleteUser);

// get a user
router.get("/:id", auth, userController.getUser);

module.exports = router;
