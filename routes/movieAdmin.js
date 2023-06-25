var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();
const { mongoose, usersModel } = require("../dbMovieSchema");
const { mongodb, dbName, dbUrl, MongoClient } = require("../dbConfig");

mongoose.connect(dbUrl);
const { render } = require("jade");
const { token } = require("morgan");
const client = new MongoClient(dbUrl);

router.get("/getMovieData", async (req, res) => {
  try {
    let movie = await usersModel.find();
    if (movie === null) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const movieData = await fetch(
        "https://imdb-api.com/en/API/Top250Movies/k_m0id77j2",
        requestOptions
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {

          for (let i = 0; i < 10; i++) {
            const myArray = data.items[i].crew.split(",");

            let getProducer = myArray[0];
            let getActorData = myArray.shift();
            let getActor = myArray.join(",");
            const body = new usersModel({
              id: i,
              Name: data.items[i].title,
              YearOfRelease: data.items[i].year,
              Producer: getProducer,
              Actors: getActor,
            });

            body.save();
          }
        });}
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});

router.get("/getMovieData1", async (req, res) => {
    try {
      let movie = await usersModel.find();
    
        res.send({
          statusCode: 200,
          data: movie,
        });

    } catch (error) {
      console.log(error);
      res.send({ statusCode: 401, message: "Internal Server Error", error });
    }
  });




  router.post("/postDataForMovie", async (req, res) => {
    try {
        // user.Name =req.body.name
        // user.YearOfRelease =req.body.yearOfRelease
        // user.Actors =req.body.actors
        // user.Producer =req.body.producer
      let newUser = await usersModel.create(req.body);
      res.send({
        statusCode: 200,
        message: "Movie Added Successfully",
      });
    } catch (error) {
      console.log(error);
      res.send({ statusCode: 200, message: "Internal Server Error", error });
    }
  });

  let idArray =[];
  router.get('/getDataForPut/:id',async(req,res)=>{
    try {
  idArray.push(req.params.id)
      let user = await usersModel.findOne({_id:new mongodb.ObjectId(req.params.id)})
      console.log(user)
      if(user)
      {

        res.send(user)
        }
      else
        res.send({statusCode:400,message:"User does not exists"})
    } catch (error) {
      console.log(error)
      res.send({statusCode:400,message:"Internal Server Error",error})
    }
  })

  router.put('/getDataForPutUpdate',async(req,res)=>{
    try {

      let user = await usersModel.findOne({_id:new mongodb. ObjectId(idArray[idArray.length-1])})
       console.log(user)
      if(user)
      {
         user.Name =req.body.name
        user.YearOfRelease =req.body.yearOfRelease
        user.Actors =req.body.actors
        user.Producer =req.body.producer
        await user.save()
        res.send({statusCode:200,message:"User data saved successfully"})
        }
      else
        res.send({statusCode:400,message:"User does not exists"})
    } catch (error) {
      console.log(error)
      res.send({statusCode:400,message:"Internal Server Error",error})
    }
  })

  router.delete('/deleteMovie/:id',async(req,res)=>{
    try {
      let user = await usersModel.find({_id:new mongodb.ObjectId(req.params.id)})
      if(user.length)
      {
         let users =await usersModel.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
        res.send({statusCode:200,message:"User deleted successfully"})
        }
      else
        res.send({statusCode:400,message:"User does not exists"})
    } catch (error) {
      console.log(error)
      res.send({statusCode:400,message:"Internal Server Error",error})
    }
  })

module.exports = router;
