var express = require("express");
var router = express.Router();
const { mongoose, usersModel } = require("../dbActorSchema");
const { mongodb, dbName, dbUrl, MongoClient } = require("../dbConfig");

mongoose.connect(dbUrl);
var nodemailer = require("nodemailer");
const { render } = require("jade");
const { token } = require("morgan");
const client = new MongoClient(dbUrl);

let data = [
  {
    ActorName: "Tim Robbins,",
    Gender: "Male",
    DOB: "19/02/1999",
    BIO: "Excellant Actor",
  },
  {
    ActorName: "Marlon Brando",
    Gender: "Male",
    DOB: "19/02/1999",
    BIO: "Excellant Actor",
  },
  {
    ActorName: "Liam Neeson",
    Gender: "Male",
    DOB: "19/02/1999",
    BIO: "Excellant Actor",
  },
  {
    ActorName: "Henry Fonda",
    Gender: "Male",
    DOB: "19/02/1999",
    BIO: "Excellant Actor",
  },
  {
    ActorName: "Lee J. Cobb",
    Gender: "Male",
    DOB: "19/02/1999",
    BIO: "Excellant Actor",
  },
  {
    ActorName: "Ralph Fiennes",
    Gender: "Male",
    DOB: "19/02/1999",
    BIO: "Excellant Actor",
  },
  {
    ActorName: "Al Pacino",
    Gender: "Male",
    DOB: "19/02/1999",
    BIO: "Excellant Actor",
  },
  {
    ActorName: "Morgan Freeman",
    Gender: "Male",
    DOB: "19/02/1999",
    BIO: "Excellant Actor",
  },
];


router.get("/actorData", async (req, res) => {
    try {
       let movie = await usersModel.find();
      if (movie === null) {
   
        for (let i = 0; i < data.length; i++) {

            const body = new usersModel({
                ActorName: data[i].ActorName,
                Gender: data[i].Gender,
                DOB: data[i].DOB,
                BIO: data[i].BIO,
            });

            body.save();
          }
   
   
    }
    } catch (error) {
      console.log(error);
      res.send({ statusCode: 401, message: "Internal Server Error", error });
    }
  });


  router.get("/movieActors", async (req, res) => {
    try {
      let movie = await usersModel.find();
      let actorsList=[];
      for (let i = 0; i < movie.length; i++) {
        actorsList.push(movie[i].ActorName)
      }
        var unique_array = [...new Set(actorsList)];
        res.send({
          statusCode: 200,
          data: unique_array,
        });
      
    } catch (error) {
      console.log(error);
      res.send({ statusCode: 401, message: "Internal Server Error", error });
    }
  });


  router.post("/sendActorData", async (req, res) => {
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
