const path = require("path");
const fs = require("fs");
module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });



    // Create New Characters - takes in JSON input
    app.post("/api/notes", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newNote = req.body;

        // Using a RegEx Pattern to remove spaces from newNote
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
        console.log(newNote);
        fs.readFile(path.join(__dirname, "../db/db.json"), function (err, data) {
            if (err) {
                console.log(err);
            }

            let notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), function (err) {
                if (err) {
                    console.log(err);
                }
                res.json(notes);

            })
        });
    });


    app.delete("/api/notes/:id", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var chosenNote = req.params.id;

        // Using a RegEx Pattern to remove spaces from newNote
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html


        fs.readFile(path.join(__dirname, "../db/db.json"), function (err, data) {
            if (err) {
                console.log(err);
            }
            let notes = JSON.parse(data);
            let newNote = notes.filter(note => note.id !== chosenNote);
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNote), function (err) {
                if (err) {
                    console.log(err);
                }
                res.json(newNote);

            })
        });
    });
}
