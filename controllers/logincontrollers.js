const passport=require("passport")


require("../KimlikDogrulama/passport/local") //kimlik doğrulama



module.exports.getLogin=(req,res,next)=>{
    if(req.user){
        res.redirect("/home")
    }else{
        res.render("login")
    }
}

module.exports.postLogin=(req,res,next)=>{
    passport.authenticate("local",{
        successRedirect : "/home",    //eğer doğrulama başarılı geçmiş ve herhangi bi hata  yoksa anasayfaya gider.
        failureRedirect: "/login",   //eğer herhangi bi hata olduysa logine gider.
        failureFlash:true,
        successFlash:true           //herhangi bi hata veya doğrulama olduğunda flashların kullanılmasına izin verilir.

    })(req,res,next);      //Bu fonksiyonun hemen çalışmasını sağlar.
}

