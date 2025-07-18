import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    pinned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model("Note", noteSchema); 