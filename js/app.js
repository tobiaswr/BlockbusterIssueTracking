var express = require('express');
var mysql = require('mysql');
var cors = require('cors');


const app = express();
app.use(cors());
app.options('*', cors());

//Create connection to MySQL Database Server
function getMySQLConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'roskildev2',
        database : 'blockbuster'
    });
}


//Get all movies
app.get('/getMovies', function(req, res) {
    var moviesList = [];

    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    // Do the query to get data.
    connection.query('SELECT * FROM movies', function(err, rows) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Loop check on each row
            for (var i = 0; i < rows.length; i++) {

                // Create an object to save current row's data
                var movie = {
                    id: rows[i].id,
                    title: rows[i].title,
                    releaseYear: rows[i].releaseYear,
                    needsResume: rows[i].needsResume,
                    needsTrans: rows[i].needsTrans,
                    img: rows[i].img
                }
                // Add object into array
                moviesList.push(movie);
            }
            res.send(moviesList);
        }
    });

    // Close the MySQL connection
    connection.end();
});

//Get a movie based on ID
app.post('/resumeDone/:id', function(req, res) {
    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    // Do the query to get data.
    connection.query(`UPDATE movies SET needsResume = 0 WHERE id =  + ${req.params.id}`, (err, rows) => {

        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Check if the result is found or not
            if(rows.length !== 0) {
                res.send("Updated.");
            } else {
                // render not found page
                res.status(404).json({"status_code":404, "status_message": "Not found"});
            }
        }
    });

    // Close MySQL connection
    connection.end();
});

//Set movie ready to post
app.post('/transDone/:id', function(req, res) {
    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    // Do the query to get data.
    connection.query(`UPDATE movies SET needsTrans = 0 WHERE id =  + ${req.params.id}`, (err, rows) => {

        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Check if the result is found or not
            if(rows.length !== 0) {
                res.send("Updated.");
            } else {
                // render not found page
                res.status(404).json({"status_code":404, "status_message": "Not found"});
            }
        }
    });

    // Close MySQL connection
    connection.end();
});

//Add new movie
app.post('/addMovie', function(req, res) {
    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    // Do the query to get data.
    connection.query(`INSERT INTO movie (?, ?, ?, 1, ?)`, (err, rows) => {

        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Check if the result is found or not
            if(rows.length !== 0) {
                res.send("Updated.");
            } else {
                // render not found page
                res.status(404).json({"status_code":404, "status_message": "Not found"});
            }
        }
    });

    // Close MySQL connection
    connection.end();
});

app.listen(3000, function () {
   console.log('Listening on port 3000');
});