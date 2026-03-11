const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
       name : String,
       email : { type : String, unique : true, required : true },
       password : { type : String, required : true },
       role : {type : String, default : "user"}
    })

    module.exports = mongoose.model('user', userSchema)