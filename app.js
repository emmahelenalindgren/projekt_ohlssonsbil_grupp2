var express = require("express");
var mongoose = require("mongoose");
var app = express();
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);
var pug = require('pug');
var routy = require("./routes.js");
var bodyParser = require("body-parser");


app.set("view engine", "pug")
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routy)



app.get("*", (req, res) => {
    res.sendFile(__dirname + "/fel.html");
})



server.listen(3000, () => {
    console.log("lyssnar på 3000");
});