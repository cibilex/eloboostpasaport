const localStrategy=require("passport-local").Strategy;
const passport=require("passport")
const bcrypt=require("bcryptjs") //passportu bcrypt ile 
const User=require("../../models/userSchema")



passport.use(new localStrategy((username,password,done)=>{   //formdan gelen bilgilerdeki username ve password buraya getirilir.
    User.findOne({username},(err,user)=>{         //veritabanımızda username anahtar başlığı ile arama yapıyoruz ve varsa getirecek.
        if(err) return done(err,null,"bir hata oluştu")   // eğer bir hata olursa bu fonksiyon çalışır ve değeri done fonksiyonunun ilk parametresi hata,2.parametresi user değeri burda olmadığından null yazılır ve 3.parametresinde ise istenilen mesaj yazılır.
        
        if(!user){
            return done(null,false,"user not found")   // bu kısımda aranan user yoksa fonksiyonudur.Done ilk parametresi hata olmadığından null,2. parametresi user  bulunmadığından false,3. parametresi istenen mesajdır.
        }

        bcrypt.compare(password,user.password,(err,res)=>{   // bcrpyt.compare fonksiyonu yazılan 2 parametreyi karşılaştırıyor.1.parametrede loginde yazılan password değeri (boto geliyor).2.parametre ise veritabanımızda heşşlenmiş şekilde duran password değerimiz.İkisi eşleşirse res değeri true gelir.

            if(res){
                return done(null,user,"succesfuly logged In")  //eğer eşleşme onaylanmışsa done fonksiyonunun 1.parametresi null yani hata yok.2.parametresi user değeri 3. parametresi ise istenen mesajdır.Flash olarak kullanılır bu mesajlar
            }else{
                return done(null,false,"Incorred Password")  //eğer loginden gelen parola ve veritabanındaki parola aynı değilse bu fonksiyon çalışır.done fonksiyonunun 1.parametresi null,2.parametresi false yani passwordlar eşleşmedi .3.parametre ise istenen mesajdır
            }
        })


        


    })

}) ) ; 


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });                             // bu iki fonksiyon user değerini kullanmamızı sağlar.Passportjs sitesinde  serialize diye bul kopyala ve yapıştır.

//Böylece stratejimiz bitmiş oldu ve logine Post olduğunda kullanmak üzere hazır hale geldi.Artık login controllerda kullanabiliriz.
