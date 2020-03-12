module.exports.getLogout=(req,res,next)=>{
    req.logout()
    req.flash("logout","Başarılı şekilde çıkış yapıldı")
    res.redirect("/login")
}