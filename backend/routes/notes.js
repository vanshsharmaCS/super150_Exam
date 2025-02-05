const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Note
router.post("/", authMiddleware, async (req, res) => {
    const { title, content, type } = req.body;
    try {
        const note = new Note({ userId: req.user.id, title, content, type });
        await note.save();
        res.json(note);
    } catch (error) {
        res.status(400).json({ message: "Error creating note" });
    }
});

// Get Notes
router.get("/", authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: 1 });
        res.json(notes);
    } catch (error) {
        res.status(400).json({ message: "Error fetching notes" });
    }
});

// Delete Note
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting note" });
    }
});

module.exports = router;
