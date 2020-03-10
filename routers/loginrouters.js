const router = require('express').Router();
const loginController=require("../controllers/logincontrollers")

router.get("/login",loginController.getLogin)
router.post("/login",loginController.postLogin)

module.exports=router;