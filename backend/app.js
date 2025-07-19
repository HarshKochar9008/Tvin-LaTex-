const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const notesRouter = require("./routes/notes");
const dotenv = require("dotenv");
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