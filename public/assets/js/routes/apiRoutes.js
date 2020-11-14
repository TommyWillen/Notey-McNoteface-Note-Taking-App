const fs = require("fs");
const noteData = require("../../../../db/db.json")

module.exports = app => {
  // gets the data from the note db
  app.get("/api/notes", function (req, res) {
    return res.json(noteData)
  })

  app.post("/api/notes", function (res, req) {
    const newNote = req.body;

    newNote.id = noteData.length;
    noteData.push(newNote);
    const noteString = JSON.stringify(noteData);
    fs.writeFile("db/db.json", noteString, function (err) {
      if (err) throw err;
      console.log("Note Sent!");
      // render new note
      res.send();
    });
  })


  app.delete("/api/notes/:id", function(req, res) {
    noteData.splice(req.params.id, 1);
    if (noteData) {
            for (let i = 0; i < noteData.length; i++) {
                noteData[i].id = i;
            };
        };
    fs.writeFile("db/db.json", JSON.stringify(noteData), (err) => {
        if (err) throw err;
        console.log("Note #" + req.params.id + " deleted");
        res.send();
    });
    
    
});


}