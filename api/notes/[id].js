import dbConnect from "../../_dbConnect";
import Note from "../../Note";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    return res.status(200).json(note);
  }

  if (req.method === "PUT") {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    return res.status(200).json(note);
  }

  if (req.method === "DELETE") {
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    return res.status(200).json({ message: "Note deleted" });
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 