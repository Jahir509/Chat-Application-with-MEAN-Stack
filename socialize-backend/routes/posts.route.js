const express = require('express');
const route = express.Router();
const Post = require("../model/post");
const multer = require("multer");
const fileTypeMap = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = fileTypeMap[file.mimetype];
        let uploadError = new Error('Invalid Image Type');
        if(isValid){
            uploadError = null
        }
        cb(uploadError, 'images')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = fileTypeMap[file.mimetype];
        cb(null,`${fileName}-${Date.now()}.${extension}`)
    }
})


route.post("",multer({storage:storage}).single("image"),async(req,res)=>{
   const url = req.protocol + '://' + req.get("host");
    const data = new Post({
        title:req.body.title,
        description: req.body.description ? req.body.description : '---',
        content: req.body.content,
        imagePath: url+"/images/"+req.file.filename
    });
    const post = await data.save();
    res.status(201).json({
        message:'Post Added Successfully',
        post:post
    });
});

route.put("/:id",  async (req,res)=>{
    const data = new Post({
        _id:req.body.id,
        title:req.body.title,
        description: req.body.description ? req.body.description : '---',
        content: req.body.content
    });
    const post = await Post.updateOne({_id:req.params.id},data);
    res.status(200).json({
        message:'Post Update Successfully',
        post:post
    });
    //console.log(req.params.id);
});


route.get("",async (req,res)=>{
    const post = await Post.find();
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: post
    });

});

route.get("/:id",async (req,res)=>{
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
});

route.delete("/:id",async (req,res)=>{
    const posts = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "Posts deleted successfully!",
    });
});

module.exports = route;