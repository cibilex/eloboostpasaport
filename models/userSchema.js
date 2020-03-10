const mongoose = require('mongoose');
const schema=mongoose.Schema;


var users=new schema({
    username:String,
    password:String
})

const user=mongoose.model("user",users)

module.exports=user;