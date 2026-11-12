const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      user: req.user.userId,
    });

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.log("Create task error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const myTasks = await Task.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: myTasks.length,
      tasks: myTasks,
    });
  } catch (error) {
    console.log("Get tasks error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.log("Get task error:", error.message);
    res.status(400).json({ message: "Invalid task id" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status, priority, dueDate } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log("Update task error:", error.message);
    res.status(400).json({ message: "Invalid task data" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Delete task error:", error.message);
    res.status(400).json({ message: "Invalid task id" });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
};