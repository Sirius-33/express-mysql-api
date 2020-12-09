var express = require("express");
var app = express();
var formidable = require("express-formidable");

app.use(formidable());

require("./cheeses_route")(app);

app.listen(1337, function() {
    console.log("Server started");
});