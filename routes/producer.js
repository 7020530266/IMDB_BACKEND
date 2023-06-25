var express = require("express");
var router = express.Router();
const { mongoose, usersModel } = require("../dbProducerSchema");
const { mongodb, dbName, dbUrl, MongoClient } = require("../dbConfig");

mongoose.connect(dbUrl);
var nodemailer = require("nodemailer");
const { render } = require("jade");
const { token } = require("morgan");
const client = new MongoClient(dbUrl);

let data = [
  {
    producerName: "	Frank Darabont (dir.),",
    producerGender: "Male",
    producerDob: "19/02/1999",
    producerBio: "Excellant Producer",
  },
  {
    producerName: "Francis Ford Coppola (dir.)",
    producerGender: "Male",
    producerDob: "19/02/1999",
    producerBio: "Excellant Producer",
  },
  {
    producerName: "Steven Spielberg (dir.)",
    producerGender: "Male",
    producerDob: "19/02/1999",
    producerBio: "Excellant Producer",
  },
  {
    producerName: "Sidney Lumet (dir.)",
    producerGender: "Male",
    producerDob: "19/02/1999",
    producerBio: "Excellant Producer",
  },
  {
    producerName: "Francis Ford Coppola (dir.)",
    producerGender: "Male",
    producerDob: "19/02/1999",
    producerBio: "Excellant Producer",
  }
];


router.get("/producerData", async (req, res) => {
    try {
       let movie = await usersModel.find();
      if (movie === null) {
   
        for (let i = 0; i < data.length; i++) {

            const body = new usersModel({
                producerName: data[i].producerName,
                producerGender: data[i].producerGender,
                producerDob: data[i].producerDob,
                producerBio: data[i].producerBio,
            });

            body.save();
          }
   
   
     }
    } catch (error) {
      console.log(error);
      res.send({ statusCode: 401, message: "Internal Server Error", error });
    }
  });


  router.get("/movieProducers", async (req, res) => {
    try {
      let movie = await usersModel.find();
      let producersList=[];
      for (let i = 0; i < movie.length; i++) {
        producersList.push(movie[i].producerName)
      }
        var unique_array = [...new Set(producersList)];
        res.send({
          statusCode: 200,
          data: unique_array,
        });
      
    } catch (error) {
      console.log(error);
      res.send({ statusCode: 401, message: "Internal Server Error", error });
    }
  });


  router.post("/sendProducerData", async (req, res) => {
    try {
        // user.Name =req.body.name
        // user.YearOfRelease =req.body.yearOfRelease
        // user.Actors =req.body.actors
        // user.Producer =req.body.producer
      let newUser = await usersModel.create(req.body);
      res.send({
        statusCode: 200,
        message: "Actor Added Successfully",
      });
    } catch (error) {
      console.log(error);
      res.send({ statusCode: 200, message: "Internal Server Error", error });
    }
  });
module.exports = router;
