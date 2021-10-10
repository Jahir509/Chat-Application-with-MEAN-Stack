const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

router.post("/signup",async (req,res)=>{
    // bcrypt.hash(req.body.password,10).then(hash=> {
    //     const user = new User({
    //         email:req.body.email,
    //         password:hash
    //     });

    // })

        bcrypt.hash(req.body.password,10, async function(err,hash){
            if(err) {
                res.send(404).json({
                    message:''
                })

            }
        })
});

module.exports=router;