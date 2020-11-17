const fs = require("fs");
const notes = require("../db/db.json")

module.exports = app => {
  // gets the data from the note db
  app.get("/api/notes", function (req, res) {
    return res.json(notes)
  })


// adds new note based on user request
  app.post("/api/notes", function (req, res) {

    const newNote = req.body;
    // adds note id to the note in the db for easy access for get and delete requests
    (notes.length === 0) ? newNote.id = 0 : newNote.id = notes.length;
    notes.push(newNote);
    const noteString = JSON.stringify(notes);
    // using fs module to add new note to the db
    fs.writeFile("./db/db.json", noteString, function (err) {
      if (err) throw err;
      console.log("Note Sent!");
      res.send();
    });
  })

// finds the specific note from the db based on the id of the note and removes it and updates the db using fs
  app.delete("/api/notes/:id", function (req, res) {
    notes.splice(req.params.id, 1);
    if (notes) {
      for (let i = 0; i < notes.length; i++) {
        notes[i].id = i;
      };
    };
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      console.log("Note #" + req.params.id + " deleted");
      res.send();
    });


  });


}