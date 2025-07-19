import dbConnect from "./_dbConnect";
import Note from "./Note";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const notes = await Note.find().sort({ updatedAt: -1 });
    return res.status(200).json(notes);
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    return res.status(201).json(note);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 