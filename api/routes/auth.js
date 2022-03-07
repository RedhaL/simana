const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//Signup

router.post("/signup", async (req, res) => {
  try {
    // check if user already exist
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res
        .status(409)
        .send(
          "Another user with this email adress already Exist. Please Login or Signup with another email adress."
        );
    }

    //Generate new password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user
    const user = await newUser.save();

    // Create token
    const token = jwt.sign(
      { username: req.body.username, email: req.body.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // return new user
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!user) {
      res.status(404).json("user not found");
    } else {
      if (!validPassword) {
        res.status(400).json("wrong password");
      } else {
        // Create token
        const token = jwt.sign(
          { username: req.body.username, email: req.body.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "7d",
          }
        );

        // save user token
        user.token = token;
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
