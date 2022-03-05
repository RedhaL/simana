const router = require("express").Router();
const Task = require("../models/Task");

// create new task
// Warning : task duplicates may exist given the same task Id and the same User Id
router.post("/", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const task = await newTask.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a task
router.put("/", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.body._id });
    if (task.userId === req.body.userId) {
      await task.updateOne({ $set: req.body });
      res.status(200).json("the task was updated");
    } else {
      res.status(403).json("You are not the owner of this task");
    }
  } catch (err) {
    res.status(500).json("the task doesn't exist");
  }
});

//delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (task.userId === req.body.userId) {
      await Task.deleteOne({ id: req.params.id });
      res.status(200).json("post deleted");
    } else {
      res.status(403).json("you can't delete posts of other users");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    const { createdAt, updatedAt, __v, ...filteredTask } = task._doc;
    res.status(200).json(filteredTask);
  } catch (err) {
    res.status(500).json(err);
  }
});


// get last task
router.get("/:userId", async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id }, { sort: { 'created_at' : -1 } });
    const { createdAt, updatedAt, __v, ...filteredTask } = task._doc;
    res.status(200).json(filteredTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user's tasks
router.get("/all/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    const filteredTasks = tasks.map((e) => {
      const { createdAt, updatedAt, __v,id, ...filteredTask } = e._doc;
      return filteredTask;
    });
    res.status(200).json(filteredTasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
