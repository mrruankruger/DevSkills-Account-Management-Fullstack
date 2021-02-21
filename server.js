// Create express app
var express = require("express")
var app = express()
const { v4: uuidv4 } = require('uuid'); //uuidv4();
// var db = require("./backend/database.js")
var routes = require("./backend/apiEndPoints.js")
const cors = require('cors');

app.use(cors())

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ "message": "Ok" })
});

//API ENDPOINTS
app.use(routes)
