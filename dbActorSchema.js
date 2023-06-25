const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    ActorName:{type:'string',required:true},
    Gender:{type:'string',require:true},
    DOB:{type:"string",require:true},
    BIO:{type:'string',required:true}
})

let usersModel = mongoose.model('Actor',userSchema);

module.exports={mongoose,usersModel}