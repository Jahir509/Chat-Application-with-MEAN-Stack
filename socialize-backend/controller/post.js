const Post = require("../model/post");

exports.getAllPosts = async (req,res,next)=>{
    const pageSize = +req.query.pageSize;
    const currenPage = + req.query.page;
    let post = [];
    const postQuery = Post.find();
    if(pageSize && currenPage){
        postQuery.skip(pageSize * (currenPage - 1)).limit(pageSize)
    }
    post = await postQuery;
    let totalData = await Post.count();
    // console.log(post);
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: post,
        total:totalData
    });
}

exports.getPostById = async (req,res,next)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch (error) {
        res.status(502).json({ message: 'Bad Gateway' });
    }
}

exports.createPost = async(req,res,next)=>{
    const url = req.protocol + '://' + req.get("host");
    const data = new Post({
        title:req.body.title,
        description: req.body.description ? req.body.description : '---',
        content: req.body.content,
        imagePath: url+"/images/"+req.file.filename,
        creator:req.user.id
    });
    try{
        const post = await data.save();
        if(!post){
            res.status(502).json({
                message:'Bad Gateway',
            });
        }
        res.status(201).json({
            message:'Post Added Successfully',
            post:post
        });
    }catch (error) {
        res.status(500).json({ message: 'Could not save the post' });
    }
}

exports.updatePost = async (req,res,next)=>{
    let imagePath = req.body.imagePath;
    //console.log(imagePath)
    if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url+"/images/"+req.file.filename
    }
    const data = new Post({
        _id:req.body.id,
        title:req.body.title,
        description: req.body.description ? req.body.description : '---',
        content: req.body.content,
        imagePath: imagePath,
        creator:req.user.id
    });
    try{
        const post = await Post.updateOne({_id:req.params.id,creator:req.user.id},data);
        if(post.matchedCount > 0){
            res.status(200).json({
                message:'Post Update Successfully',
                post:post
            });
        }
        else{
            res.status(401).json({ message: "Not authorized!" });
        }
    }catch (error) {
        // res.status(500).json({ message: 'Could not update the post' });
        console.log(error);
    }
}

exports.deletePost = async (req,res,next)=>{
    try{
        const post = await Post.findOne({_id:req.params.id,creator:req.user.id});
        if(!post){
            res.status(401).json({ message: "Not authorized!" });
        }
        await Post.findOneAndRemove({_id:req.params.id,creator:req.user.id})
        res.status(200).json({
            message: "Posts deleted successfully!",
        });
    }catch (e) {
        res.status(500).json({ message: 'Could not delete the post' })
    }
}