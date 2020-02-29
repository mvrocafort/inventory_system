// Initialize the requirements
const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');


// Create express object
var app = express();

// Set the port number if there is a specified port
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}.`)
})

// Create a connection with MySQL
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory"
});

// Connect
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Select and display all items
app.get('/items', (req, res) => {
	con.query('SELECT * FROM items', (err, rows, fields) => {
		if(!err)
			//console.log(rows);
			res.send(rows);
		else
			console.log(err);
	})
});