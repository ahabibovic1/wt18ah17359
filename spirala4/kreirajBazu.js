//kreiranje baze
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Povezano!");
    connection.query("CREATE DATABASE IF NOT EXISTS wt2018", function (err, result) {
        if (err) throw err;
        console.log("Baza kreirana");
    });
});