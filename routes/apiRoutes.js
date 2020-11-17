const fs = require("fs");
const notes = require("../db/db.json")

module.exports = app => {
  // gets the data from the note db
  app.get("/api/notes", function (req, res) {
    return res.json(notes)
  })
  
  

  app.post("/api/notes", function (req, res) {
    console.log(req.body);
    console.log(req.body);
    const newNote = req.body;
    console.log(newNote);
    console.log(notes.length);
    (notes.length === 0) ? newNote.id = 0:newNote.id = notes.length;
    console.log(newNote.id)
    // newNote.id = notes.length;
    notes.push(newNote);
    console.log(notes)
    const noteString = JSON.stringify(notes);
    console.log(noteString);
    fs.writeFile("./db/db.json", noteString, function (err) {
      if (err) throw err;
      console.log("Note Sent!");
      // render new note
      res.send();
    });
  })


  app.delete("/api/notes/:id", function(req, res) {
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