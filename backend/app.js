import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import notesRouter from "./routes/notes.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use("/api/notes", notesRouter);
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err)); 