const path = require('path')
const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const postRoutes = require("./routes/posts.route");
const authRoutes = require("./routes/auth.route");
// import env variables
require('dotenv').config()

mongoose.connect(process.env.db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'mean'
})
	.then(() => {
		console.log('Database Connection is ready...');
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(process.env.PORT, () => {
	console.log("Server is running");
});

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join(__dirname,"images")));

app.use((req,res,next)=>{
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
	res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,PUT,OPTIONS");
	next();
})

app.use("/api/posts",postRoutes);
app.use("/api/auth",authRoutes);


