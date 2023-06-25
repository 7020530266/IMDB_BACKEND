const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    Name:{type:'string',required:true},
    YearOfRelease:{type:'string',require:true},
    Producer:{type:'string',require:true},
    Actors:{type:'string',required:true}
})

let usersModel = mongoose.model('MovieAdmin',userSchema);

module.exports={mongoose,usersModel}