const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/signup",async (req,res)=>{

    bcrypt.hash(req.body.password,10, async function(err,hash){
        if(err) {
            res.status(400).json({
                message:'Bad Request'
            })
        }
        let user = new User({
            email:req.body.email,
            password:hash
        });
        try{
            user = await user.save();
            res.status(201).json({
                message:'User Created Successfully',
                data:{
                    email:user.email,
                    _id:user._id
                }
            });
        }catch (e) {
            res.status(406).json({
                message:'Email is Already registered',
                error:"Email is Already registered"
            });
        }
    })
});

router.post("/login",async (req,res,next)=>{
    const user =await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({
            message:"User Not Found!"
        })
    }
    const invalidPassword = await bcrypt.compare(req.body.password,user.password);
    if(!invalidPassword) {
        return res.status(400).json({
            message:'Invalid Password'
        })
    }
    const token = jwt.sign({email:user.email,id:user._id},'KothinSercret',{expiresIn: "1h"})
    res.status(202).json({
        token:token,
        expiresIn:3600
    });

})


module.exports=router;