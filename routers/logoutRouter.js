const router=require("express").Router();
const logoutController=require("../controllers/logout")

router.get("/logout",logoutController.getLogout)


module.exports=router;