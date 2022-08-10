const express =require('express');
const path = require('path')
const {
    getPosts,
    getPost,
    deletePost,
    makeNewPost,
    sendNewPost} = require('../controllers/post-controller');

const router = express.Router();


router.get('/posts',getPosts);

router.delete('/posts/:id',deletePost);

router.post('/newPost',sendNewPost);

router.get('/newPost',makeNewPost);

router.get('/posts/:id',getPost);

module.exports = router;
