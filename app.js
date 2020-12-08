const express = require('express')
var app = express();

// To create an endpoint that looks something like this: https://localhost:1337/api/v1/whatever
/* app.get("/api/v1/cheeses", function (req, res) {
}) */

app.get("/hello", function (request, response) {
    response.send("Hello, Dweller!");
})

app.get("/goodbye", function (request, response) {
    response.send("Goodbye, Dweller see you next time!");
})


app.listen(1337, function () {
    console.log("Server started");
});


// HTTP requests must get a response.
// POST GET PUT/PATCH DELETE