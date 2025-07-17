import express from "express";
import Note from "../models/Note.js";

const router = express.Router();
router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ updatedAt: -1 });
  res.json(notes);
});
router.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  await note.save();
  res.status(201).json(note);
});
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
router.delete("/:id", async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json({ message: "Note deleted" });
});
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