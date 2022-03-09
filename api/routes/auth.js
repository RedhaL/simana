const router = require("express").Router();
const authenticationController = require("../controllers/authController.js");

// signup
router.post("/signup", authenticationController.signup);

// login
router.post("/login", authenticationController.login);

module.exports = router;
