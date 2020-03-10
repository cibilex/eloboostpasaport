 const express = require('express');
 const app = express()
 PORT=8000 || proggess.env.PORT;
 const loginRouters=require("./routers/loginrouters")
 const registerRouter=require("./routers/registerrouters")
 const ejs=require("ejs")
 const ejsLayouts=require("express-ejs-layouts")
 const path=require("path")
 const bodyParser=require("body-parser")
 const userSchema=require("./models/userSchema")
 const mongoose = require('mongoose');


 //ejs ve ejs-layouts kurulm
 app.set("view engine","ejs")
 app.set("views",path.join(__dirname,"./views"))
 app.use(ejsLayouts)

 //body-parser kurulumu
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())

//mongodbatlas bağlantı
mongoose.connect("mongodb://localhost/eloboost",{useNewUrlParser:true, useUnifiedTopology:true})
const db=mongoose.connection;
db.on("error",console.error.bind(console,"veritabanına bağlanamadı"));
db.once("open",()=>{
    console.log("veritabanına bağlandı")
})
 //yönlendirmeler
 app.use(loginRouters)
 app.use(registerRouter)
 app.get('/', (req, res) => {
     res.send("deneme2")
 });

 app.listen(PORT, () => {
     console.log(`Server started on`+PORT);
 });
