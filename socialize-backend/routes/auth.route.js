const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth')

router.post("/signup",AuthController.createUser)
router.post("/login",AuthController.loginUser)


module.exports=router;