const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const User = require("../models/User");
const Category = require("../models/Category");

// 🔹 Get all users
router.get("/users", auth, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 🔹 Delete user by ID
router.delete("/users/:id", auth, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
});

// 🔹 Add new category
router.post("/categories", auth, isAdmin, async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });
  await category.save();
  res.status(201).json({ msg: "Category created" });
});

// 🔹 Get all categories
router.get("/categories", auth, isAdmin, async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// 🔹 Delete category
router.delete("/categories/:id", auth, isAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ msg: "Category deleted" });
});



module.exports = router;
