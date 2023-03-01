const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

const PORT = 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));


//gets saved notes
app.get("/api/notes", (reg, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"))
});

//adds new notes
app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNote = req.body;
  newNote.id = uniqid();
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes))
  res.json(notes);
});

//html call
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);