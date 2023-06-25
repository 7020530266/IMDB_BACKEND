const mongodb = require('mongodb')
const dbName = 'IMDB'
const dbUrl = `mongodb+srv://Shubham:Shubham@shubham.d1qasaw.mongodb.net/${dbName}?retryWrites=true&w=majority`
const MongoClient=mongodb.MongoClient
module.exports ={mongodb,dbName,dbUrl,MongoClient}