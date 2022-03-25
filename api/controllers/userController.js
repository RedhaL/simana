var exports = (module.exports = {});

const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user
exports.updateUser = async function (req, res) {
  if (req.body.userId === req.params.id) {
    try {
      if (req.body.password) {
        //Generate new password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
          password: hashedPassword,
        });
        res.status(200).json("Account has been updated.");
      } else {
        await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated.");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
};

// delete user
exports.deleteUser = async function (req, res) {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.deleteOne({ id: req.params.id });
      res.status(200).json("Account has been deleted.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
};

// get a user
exports.getUser = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, createdAt, ...filteredUser } = user._doc;
    res.status(200).json(filteredUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
