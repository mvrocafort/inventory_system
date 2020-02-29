// Initialize the requirements
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


// Create express object
var app = express();

// Set the view engine
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
			//res.send(rows);
			res.render('home', {items: rows});
		//else
			//console.log(err);
	})
});

// Consume an item
app.get('/items/consume/:id', (req, res) => {
	const id = req.params.id;
	con.query(`UPDATE items SET items.quantity = items.quantity - 1 WHERE items.id = ${id}`,(err, rows, fields) => {
		if(!err)
			//console.log(rows);
			res.redirect('/items');
		else
			console.log(err);
	})
});

// Delete item from inventory
app.get('/items/delete/:id', (req, res) => {
	const id = req.params.id;
	con.query(`DELETE FROM items WHERE items.id = ${id}`,(err, rows, fields) => {
		if(!err)
			//console.log(rows);
			res.redirect('/items');
		else
			console.log(err);
	})
});
 

// Show add item form to inventory system
app.get('/items/add/', (req, res) => {
    res.render('insert');
});

// Add item to inventory system
app.post('/save', (req, res) => {
    let data = {
    	name: req.body.name,
    	quantity: req.body.quantity,
    	amount: req.body.amount
    };
    let sql = "INSERT INTO items SET ?";
	con.query(sql, data, (err, rows, fields) => {
		if(!err)
			//console.log(rows);
			res.redirect('/items');
		else
			console.log(err);
	})
});
