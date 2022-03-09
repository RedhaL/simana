var exports = (module.exports = {});

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Signup
exports.signup = async function (req, res) {
  try {
    // check if user already exist
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res
        .status(409)
        .json(
          "Another user with this email adress already Exist. Please Login or Signup with another email adress."
        );
    }

    // Create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // save user
    const user = await newUser.save();

    // return new user
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login
exports.login = async function (req, res) {
  try {
    const backUser = await User.findOne({ email: req.body.email });
    if (!backUser) {
      res.status(404).json("user not found");
    } else {
      backUser.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(
            { username: req.body.username, email: req.body.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          const {
            createdAt,
            city,
            username,
            updatedAt,
            email,
            profilePicture,
            __v,
            password,
            ...user
          } = backUser._doc;
          _id = backUser._id;
          res.status(200).json({ _id, token });
        } else {
          res.status(400).json("wrong password");
        }
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
