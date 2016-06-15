var express = require("express");
var app = express();

app.use(express.static("../client"));

app.get("/api/course-list/:term", function(req, res) {
    console.log("Serving Term: " + req.params.term);

    var options = {
        root: "../public/json" 
    };

    res.sendFile(req.params.term + ".json", options);
});

var port = 9000;
if (process.argv.length > 2) {
    port = parseInt(process.argv[2]);
}

app.listen(port, function() {
    console.log("listening on port: " + port);
});