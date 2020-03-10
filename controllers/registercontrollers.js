const userSchema=require("../models/userSchema.js")

module.exports.getRegister=(req,res,next)=>{
    res.render("register")
}

module.exports.postRegister=(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;
    const bcrypt=require("bcryptjs")
    bcrypt.genSalt(10, function(err, salt) {          //bcrypt istenilen veriyi şifreler ve farklı görünür.Bu fonksiyonda register sayfasından gelen password değerini şifreliyoruz.
        bcrypt.hash(password, salt, function(err, hash) {
            if(err) throw err;
            var newuser=new userSchema({   //eğer hata olmazsa fonksiyon devam eder ve username registerdan gelen username.password ise şifrelenmiş password olur
                username:username,
                password:hash   
            })
        
            newuser.save()
            .then(()=>{
                console.log("veritabanına kaydedildi")
                res.redirect("/")   //formdan gelen bilgiler veritabanına kaydedilirse anasayfaya gitmesini istedik
            }).catch(err=>console.log(err))
            
        });
    });

    
}