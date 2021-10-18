const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
exports.createUser =async (req,res,next)=>{
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
}
exports.loginUser =async (req,res,next)=>{
    const user =await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({
            message:"User Not Found!"
        })
    }
    const invalidPassword = await bcrypt.compare(req.body.password,user.password);
    if(!invalidPassword) {
        return res.status(400).json({
            message:'Invalid credentials'
        })
    }
    const token = jwt.sign({email:user.email,id:user._id},process.env.jwt_key,{expiresIn: "1h"})
    res.status(202).json({
        token:token,
        expiresIn:3600,
        userId:user._id
    });
}