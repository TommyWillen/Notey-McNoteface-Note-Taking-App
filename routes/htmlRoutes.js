
const path = require("path");

module.exports = app => {
  // creates a pathway for the notes.html page
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  // sets the default pathway to the index.html page for any undefined pathway
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}