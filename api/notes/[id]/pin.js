import dbConnect from "../../../_dbConnect";
import Note from "../../../Note";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { pinned } = req.body;
    const note = await Note.findByIdAndUpdate(
      id,
      { pinned },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    return res.status(200).json(note);
  }

  res.setHeader("Allow", ["PATCH"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 