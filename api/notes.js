import dbConnect from './_dbConnect';
import Note from './Note';

export default function handler(req, res) {
  res.status(200).json({ message: "API is working", method: req.method });
} 