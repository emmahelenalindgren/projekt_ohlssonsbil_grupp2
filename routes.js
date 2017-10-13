var express = require("express");
var router = express.Router();
var Car = require("./models/carModel.js");
var mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;


// Koppla upp och hämta databasen carList
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/carList', {
    useMongoClient: true
});


//hämtar vår lista från databasen
router.get("/", (req, res) => {
    var carList = [];
    Car
        .find({})
        .exec()
        .then((data)=>{
            //console.log(data);
            data.forEach(function(car) {
                carList.push(car);
            });
            res.render("index.pug", {carList: carList});
        })
        .catch((err)=>{
            console.log(err);
        });



});


//postar datan till vår indexfil

router.post("/", (req, res) => {
    //Lista alla bilar
    var carList = [];
    var datum = req.body.valtDatum;
    console.log("datum: " + datum);
    //hitta alla bilar som INTE är lika med valt datum ($ne = not equal)
    Car.find({bookedDate: { $ne: datum}}, function(err, data){
        if (err){
            console.log(err);
        }
        data.forEach(function(car) {
            console.log(car);
            carList.push(car);
        });
        res.render("index.pug", {carList: carList, datum: datum});
    })
});



//skickar in datum till vald bil via id
router.get("/update", (req, res) => {
    let query = req.query;
    let id = query.id;
    var ID = new ObjectId(id);
    let bookedDate = query.bookedDate;
    console.log(query);
    Car
        .updateOne({"_id":ID},{$set:{bookedDate:bookedDate}})
        .exec()
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        });
});






module.exports = router;

