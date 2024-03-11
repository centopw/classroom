var express = require('express');
var app = express();
var fs = require("fs");
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    next();
});
app.get('/', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        res.end(data);
    });
})
var server = app.listen(5000, function () {
    console.log("Express App running at http://127.0.0.1:5000/");
})