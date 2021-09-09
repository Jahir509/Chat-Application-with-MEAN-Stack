const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan')
const Post = require('./model/post');



mongoose.connect('mongodb://localhost/mean', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'mean'
})
	.then(() => {
		console.log('Database Connection is ready...')
	})
	.catch((err) => {
		console.log(err);
	})

app.listen(3000, () => {
	console.log("Server is running");
});

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
	res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
	next();
})

app.post("/api/posts",async(req,res)=>{
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

app.get("/api/posts",async (req,res)=>{
	const posts = await Post.find();
	res.status(200).json({
		message: "Posts fetched successfully!",
		posts: posts
	});

});
