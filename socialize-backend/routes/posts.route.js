const express = require('express');
const Post = require("../model/post");

const route = express.Router();

route.post("",async(req,res)=>{
    const data = new Post({
        title:req.body.title,
        description: req.body.description ? req.body.description : '---',
        content: req.body.content
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