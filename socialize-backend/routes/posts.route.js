const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const extractFile = require('../middleware/file');
const PostController = require('../controller/post')



router.get("",PostController.getAllPosts);

router.get("/:id",PostController.getPostById);

router.post("",auth,extractFile,PostController.createPost);

router.put("/:id",auth,extractFile,PostController.updatePost);

router.delete("/:id",auth,PostController.deletePost);

module.exports = router;