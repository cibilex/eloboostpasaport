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
const passport=require("passport")
//flash için gerekli modüller
const flash=require("connect-flash")
const session=require("express-session")
const cookieParser=require("cookie-parser")
const logoutRouter=require("./routers/logoutRouter")



//ejs ve ejs-layouts kurulm
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"./views"))
app.use(ejsLayouts)

//body-parser kurulumu
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

 //connect-flash kurulum
app.use(cookieParser('passportTutorial'));
app.use(session({ cookie: { maxAge: 60000 },
   resave:true,
   secret:"passportTutorial",
   saveUninitialized:true
}));
app.use(flash());


//passport çalıştırma
app.use(passport.initialize())
app.use(passport.session())




//global flashlar yaratma
app.use((req,res,next)=>{
   res.locals.flashSuccess=req.flash("info")
   res.locals.flashLogout=req.flash("logout")
    //passportun global flashları
    res.locals.passportSuccess=req.flash("success")
    res.locals.passportFailure=req.flash("error")
   res.locals.user=req.user;
   next()
})
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
app.use(logoutRouter)
app.get('/home', (req, res) => {
    res.render("home")
});

app.listen(PORT, () => {
    console.log(`Server started on`+PORT);
});
