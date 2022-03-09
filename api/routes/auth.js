const router = require("express").Router();
var passport = require('passport');
const authenticationController = require("../controllers/authController.js");
const User = require("../models/User");

// signup
router.post("/signup", authenticationController.signup);

// login
router.post("/login", authenticationController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/planner')
    console.log("ress", res)
  }
)
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router;
