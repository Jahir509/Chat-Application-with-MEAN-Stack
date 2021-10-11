const express = require('express');
const route = express.Router();
const Post = require("../model/post");
const multer = require("multer");
const fileTypeMap = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}
const auth = require('../middleware/authentication')

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


route.get("",async (req,res)=>{
    const pageSize = +req.query.pageSize;
    const currenPage = + req.query.page;
    let post = [];
    const postQuery = Post.find();
    if(pageSize && currenPage){
        postQuery.skip(pageSize * (currenPage - 1)).limit(pageSize)
    }
    post = await postQuery;
    let totalData = await Post.count();
    console.log(post);
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: post,
        total:totalData
    });

});

route.get("/:id",async (req,res)=>{
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
});

route.post("",auth,multer({storage:storage}).single("image"),async(req,res)=>{
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

route.put("/:id",auth,  multer({storage:storage}).single("image"),async (req,res)=>{
    let imagePath = req.body.imagePath;
    console.log(imagePath)
    if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url+"/images/"+req.file.filename
    }
    const data = new Post({
        _id:req.body.id,
        title:req.body.title,
        description: req.body.description ? req.body.description : '---',
        content: req.body.content,
        imagePath: imagePath
    });
    console.log(data);
    const post = await Post.updateOne({_id:req.params.id},data);
    res.status(200).json({
        message:'Post Update Successfully',
        post:post
    });
    //console.log(req.params.id);
});

route.delete("/:id",auth,async (req,res)=>{
    const posts = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "Posts deleted successfully!",
    });
});

module.exports = route;