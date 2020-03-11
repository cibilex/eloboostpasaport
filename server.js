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
 //flash için gerekli modüller
 const flash=require("connect-flash")
 const session=require("express-session")
 const cookieParser=require("cookie-parser")
 const passport=require("passport")


 //ejs ve ejs-layouts kurulm
 app.set("view engine","ejs")
 app.set("views",path.join(__dirname,"./views"))
 app.use(ejsLayouts)

 //body-parser kurulumu
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())

 //passport çalıştırma
 app.use(passport.initialize())
 app.use(passport.session)

 //passportun global flashları
 app.use((req,res,next)=>{    // passport Stratejide yazılan mesajları flash olarak kullanmaya izin verdiğimiz için global flashlar olarak kullanabiliriz.
     res.locals.passportFailure=req.flash("error");  //hata mesajımız
     res.locals.passportSucces=req.flash("success")  //doğrulama mesajımız
     req.locals.user=req.user;     //doğru giriş yapan kullanıcı bilgisi   req.user passportaki kullanılan kullanıcıdır.
 })   // bu flash mesajları login sayfasından çıkıldığında patlar ve post ile gidilen sayfada tutulur.
     //kimlik doğrulaması sorunsuz atlatılırsa succes flashı patlar ve /home dizinine gidileceğini belirtmiştik yani flashı orda kullanabiliriz.
     //HATALI kimlik doğrulaması olursada /login sayfasına gidileceğini söylemiştik yani flashı orda kullanabiliriz.
     //veya ana layout.ejs görüntüsünde kullanabiliriz ikisinide böylece karışıklık önlenmiş olur.
 //connect-flash kurulum
 app.use(cookieParser('passportTutorial'));
 app.use(session({ cookie: { maxAge: 60000 },
    resave:true,
    secret:"passportTutorial",
    saveUninitialized:true
}));
 app.use(flash());

 //global flashlar yaratma
app.use((req,res,next)=>{
    res.locals.flashSuccess=req.flash("info")    
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
 app.get('/', (req, res) => {
     res.render("home")
 });

 app.listen(PORT, () => {
     console.log(`Server started on`+PORT);
 });
