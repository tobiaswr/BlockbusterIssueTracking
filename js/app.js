var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

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
    connection.query(`UPDATE movies SET needsTrans = 0 WHERE id = + ${req.params.id}`, (err, rows) => {

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
    let requestDone = req.body;
    var params = [requestDone.title, requestDone.releaseYear, requestDone.needsResume, requestDone.img];
    connection.query(`INSERT INTO movies (title, releaseYear, needsResume, needsTrans, img) VALUES (?, ?, ?, 1, ?)`, params, (err, rows) => {

        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Check if the result is found or not
            if(rows.length !== 1) {
                res.send("Movie added.");
            } else {
                // render not found page
                res.status(404).json({"status_code":404, "status_message": "Not found"});
            }
        }
    });

    // Close MySQL connection
    connection.end();
});

//Delete movie based on ID
app.post('/deleteMovie/:id', function(req, res) {
    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    // Do the query to get data.
    connection.query(`DELETE FROM movies WHERE id = + ${req.params.id}`, (err, rows) => {

        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Check if the result is found or not
            if(rows.length !== 0) {
                res.send("Movie deleted.");
            } else {
                // render not found page
                res.status(404).json({"status_code":404, "status_message": "Not found"});
            }
        }
    });

    // Close MySQL connection
    connection.end();
});

//Get all users
app.get('/login', function(req, res) {
    var usersList = [];

    // Connect to MySQL database.
    var connection = getMySQLConnection();
    connection.connect();

    // Do the query to get data.
    connection.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Loop check on each row
            for (var i = 0; i < rows.length; i++) {

                // Create an object to save current row's data
                var user = {
                    id: rows[i].id,
                    username: rows[i].username,
                    password: rows[i].password,
                    stilling: rows[i].stilling,
                    fornavn: rows[i].fornavn,
                    etternavn: rows[i].etternavn,
                    email: rows[i].email
                }
                // Add object into array
                usersList.push(user);
            }
            res.send(usersList);
        }
    });

    // Close the MySQL connection
    connection.end();
});

app.listen(3000, function () {
   console.log('Listening on port 3000');
});