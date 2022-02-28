const router = require("express").Router();
const User = require("../models/User");

//Signup

router.post("/signup", async (req, res) => {
  try {

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("user not found");
    } else {
      if (user.password !== req.body.password) {
        res.status(400).json("wrong password");
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
