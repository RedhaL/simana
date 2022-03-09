const router = require("express").Router();
const auth = require("../middleware/auth");
const taskController = require("../controllers/taskController.js");

// create new task
// Warning : task duplicates may exist given the same task Id and the same User Id
router.post("/", auth, taskController.newTask);

// update a task
router.put("/", auth, taskController.updateTask);

// delete a task
router.delete("/", auth, taskController.deleteTask);

// get a task
router.get("/:id", auth, taskController.getTask);

// get last task
router.get("/:userId", auth, taskController.getLaskTask);

// get user's tasks
router.get("/all/:userId", auth, taskController.getUserTasks);

module.exports = router;
