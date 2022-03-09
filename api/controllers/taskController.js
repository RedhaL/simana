var exports = (module.exports = {});
const Task = require("../models/Task");

// create new task
// Warning : task duplicates may exist given the same task Id and the same User Id
exports.newTask = async function (req, res) {
  try {
    const newTask = new Task(req.body);
    const task = await newTask.save();
    console.log("jijijijijijj", req.isAuthenticated())
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a task
exports.updateTask = async function (req, res) {
  try {
    const task = await Task.findOne({ _id: req.body._id });
    if (task.userId === req.body.userId) {
      await task.updateOne({ $set: req.body });

      const { createdAt, updatedAt, __v, ...filteredTask } = task._doc;

      res.status(200).json(filteredTask);
    } else {
      res.status(403).json("You are not the owner of this task");
    }
  } catch (err) {
    res.status(500).json("the task doesn't exist");
  }
};

//delete a task
exports.deleteTask = async function (req, res) {
  try {
    const task = await Task.findOne({ _id: req.body._id });
    if (task.userId === req.body.userId) {
      await Task.deleteOne({ _id: req.body._id });
      res.status(200).json("post deleted");
    } else {
      res.status(403).json("you can't delete posts of other users");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a task
exports.getTask = async function (req, res) {
  try {
    const task = await Task.findOne({ id: req.params.id });
    const { createdAt, updatedAt, __v, ...filteredTask } = task._doc;
    res.status(200).json(filteredTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get last task
exports.getLaskTask = async function (req, res) {
  try {
    const task = await Task.findOne(
      { id: req.params.id },
      { sort: { created_at: -1 } }
    );
    const { createdAt, updatedAt, __v, ...filteredTask } = task._doc;
    res.status(200).json(filteredTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get user's tasks
exports.getUserTasks = async function (req, res) {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    const filteredTasks = tasks.map((e) => {
      const { createdAt, updatedAt, __v, id, ...filteredTask } = e._doc;
      return filteredTask;
    });
    res.status(200).json(filteredTasks);
  } catch (err) {
    res.status(500).json(err);
  }
};
