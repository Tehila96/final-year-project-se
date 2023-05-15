var bodyParser = require('body-parser');
var fileupload = require("express-fileupload");
const express = require("express"),
  PORT = 5000,
  app = express();

const db = require("./db");
const connection = db.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());

app.get("/api/v1/all-items", (req, res) => {
  connection.query(
    'SELECT * FROM items',
    function (err, items) {
      res.send(items);
    }
  );
});

app.get("/api/v1/items/", (req, res) => {
  let gender = req.query.gender;
  let sql = 'SELECT * FROM items WHERE gender=?'
  connection.query(sql, [gender],
    function (err, items) {
      res.send(items);
    }
  );
});

app.post("/api/v1/closet", (req, res) => {
  console.log(req.files.image);
  console.log(typeof (req.files.image))
  let newItem = {
    colour: req.body.colour,
    size: req.body.size,
    gender: req.body.gender,
    brand: req.body.brand,
    state: req.body.state,
    description: req.body.description,
    image: req.files.image.data,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock
  }
  let sql = 'INSERT INTO items SET?'
  connection.query(sql, newItem,
    function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
      res.send(newItem);
    })
});


app.listen(PORT, () =>
  console.log(`start listening on port : ${PORT}`));
