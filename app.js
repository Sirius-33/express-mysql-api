const express = require('express')
var app = express();
const formidable = require('formidable'); // package to make express understand data from forms

// To create an endpoint that looks something like this: https://localhost:1337/api/v1/whatever
/* app.get("/api/v1/cheeses", function (req, res) {
}) */

app.use(formidable);

// Routing: website.com/hello - goodbye
app.get("/hello", function (request, response) {
    response.send("Hello, Dweller!");
});

app.get("/goodbye", function (request, response) {
    response.send("Goodbye, Dweller see you next time!");
});

// We can also add query strings to the routes:
app.get("/hello/:name", function (request, response) {
    response.send("Hello, " + request.params.name + "!");
});

// Create a thing on the server:
app.post("/hello", function (request, response) {
    console.log(request.fields);
    response.end(); // sends a response back to the client, as we always need a response
})

// Our server
app.listen(3000, function () {
    console.log("Server started");
});


// HTTP requests must get a response.
// POST GET PUT/PATCH DELETE