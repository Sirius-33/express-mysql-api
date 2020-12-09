var connection = require("./database");

module.exports = function (app) {
    // Create a cheese
    app.post("/api/v1/cheeses", function (request, response) {
        var sql = `INSERT INTO cheeses
							SET name = :name, price = :price, weight = :weight,
							strength = (SELECT strengths.id FROM strengths WHERE name = :strength),
                            brand = (SELECT brands.id FROM brands WHERE name = :brand)`;
                            
        /* var sql = `INSERT INTO cheeses
        (name, price, weight, strength, brand)
        values (:name, :price, :weight, :strength, :brand)`; */

        var placeholders = {
            name: request.fields.name,
            price: request.fields.price,
            weight: request.fields.weight,
            strength: request.fields.strength,
            brand: request.fields.brand
        };

        connection.execute(sql, placeholders, function (err, result) {
            if (err) {
                console.log(err);
                response.status(500);
                response.json({
                    statusCode: 500,
                    statusText: "Internal server error"
                });
                return;
            }

            // result.insertId
            //response.json(result); // this is not the final form
            var sql = `SELECT * FROM cheeses WHERE id = :id`;
            var placeholders = { id: result.insertId };
            connection.execute(sql, placeholders, function (err, result) {
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.json({
                        statusCode: 500,
                        statusText: "Internal server error"
                    });
                    return;
                }
                response.json(result);
            });
        });
    });

    // GET all cheeses
    app.get("/api/v1/cheeses", function (request, response) {
        var sql = `SELECT cheeses.id, cheeses.name, cheeses.price, cheeses.weight,
							 brands.name AS brand, strengths.name AS strength FROM cheeses
							 INNER JOIN brands
								 ON brands.id = cheeses.brand
							 INNER JOIN strengths
								 ON strengths.id = cheeses.strength`;

        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                response.status(500);
                response.json({
                    statusCode: 500,
                    statusText: "Internal server error"
                });
                return;
            }

            response.json(result);
        });
    });

    // GET a single cheese from ID
    app.get("/api/v1/cheeses/:id", function (request, response) {
        var sql = `SELECT cheeses.id, cheeses.name, cheeses.price, cheeses.weight,
							 brands.name AS brand, strengths.name AS strength FROM cheeses
							 INNER JOIN brands
								 ON brands.id = cheeses.brand
							 INNER JOIN strengths
                                 ON strengths.id = cheeses.strength
                            WHERE cheeses.id = :id`;

        var placeholders = { id: request.params.id };

        connection.query(sql, placeholders, function (err, result) {
            if (err) {
                console.log(err);
                response.status(500);
                response.json({
                    statusCode: 500,
                    statusText: "Internal server error"
                });
                return;
            }

            if (!result.length) {
                response.status(404);
                response.end();
                return;
            }

            response.json(result[0]);
        });
    });

    // DELETE a cheese from ID
    app.delete("api/v1/cheeses/:id", function (request, response) {
        var sql = `DELETE FROM cheese WHERE id = :id`;
        var placeholders = { id: request.params.id };

        connection.execute(sql, placeholders, function (err, result) {
            if (err) {
                console.log(err);
                response.status(500);
                response.json({
                    statusCode: 500,
                    statusText: "InternalServer error"
                });
                return
            }
            // result.affectedRows
            if (result.affectedRows != 1) {
                response.status(400);
                response.end();
            }

            response.status(204);
            response.end();
        });
    });
};