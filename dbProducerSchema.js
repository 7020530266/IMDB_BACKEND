const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    producerName:{type:'string',required:true},
    producerDob:{type:'string',require:true},
    producerBio:{type:"string",require:true},
    producerGender:{type:'string',required:true}
})

let usersModel = mongoose.model('producer',userSchema);

module.exports={mongoose,usersModel}