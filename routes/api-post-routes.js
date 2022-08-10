const express =require('express');
const path = require('path')
const {
    getPosts,
    getPost,
    deletePost,
    makeNewPost,
    sendNewPost} = require('../controllers/api-post-controller');

const router = express.Router();

//Get all posts
router.get('/api/posts',getPosts);
//Get post by id
router.get('/api/posts/:id',getPost);
//Add new post
router.get('/newPost',makeNewPost);
//Send new post
router.post('/api/post',sendNewPost);
//Delete post
router.delete('/api/post/:id',deletePost);





module.exports = router;
