const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Ticket = require("../models/Ticket");

// Create a ticket
router.post("/", auth, async (req, res) => {
  const { subject, description, category } = req.body;

  if (!subject || !description) {
    return res.status(400).json({ msg: "Subject and description required" });
  }

  try {
    const newTicket = new Ticket({
      user: req.user.id,
      subject,
      description,
      category
    });

    await newTicket.save();

    res.status(201).json({ message: "Ticket created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

