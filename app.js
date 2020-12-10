var express = require("express");
var app = express();
var formidable = require("express-formidable");

app.use(formidable());

require("./cheeses_route")(app);

app.use(function(error, request, response) {
    if (error) {
        console.log(error);
        response.status(500);
        response.json({
            statusCode: 500,
            statusText: "InternalServer error"
        });
    }
});

app.listen(1337, function() {
    console.log("Server started");
});