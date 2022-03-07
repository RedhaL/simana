const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async (req, res) => {
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
});

// delete user
router.delete("/:id", async (req, res) => {
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
});

// get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {password, updatedAt, createdAt, ...filteredUser } = user._doc;
    res.status(200).json(filteredUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
