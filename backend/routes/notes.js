import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ updatedAt: -1 });
  res.json(notes);
});

// Get a single note
router.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

// Create a note
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  await note.save();
  res.status(201).json(note);
});

// Update a note
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

// Delete a note
router.delete("/:id", async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json({ message: "Note deleted" });
});

// Pin or unpin a note
router.patch("/:id/pin", async (req, res) => {
  const { pinned } = req.body;
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { pinned },
    { new: true }
  );
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

export default router; 