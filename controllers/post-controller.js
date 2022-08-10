const Post = require('../models/post'); 
const path = require('path')


const getPosts = (req,res)=>{
    const title = 'Posts'
    Post
    .find()
    .sort({createdAt:-1})
    .then((posts)=>res.render(path.resolve(__dirname, '../views','posts.ejs'),{title,posts}))
    .catch((err)=>console.log(err));
};


const getPost = (req,res)=>{
    const title = 'Post';
    Post
      .findById(req.params.id)
      .then(post => res.render(path.join(__dirname, '../views','post.ejs'), { post, title }))
      .catch((error) => {
        console.log(error);
        res.render(path.join(__dirname, '../views','error.ejs')), { title: 'Error' }});
};


const deletePost = (req,res)=>{
    Post
    .findByIdAndDelete(req.params.id)
    .then((result)=>res.sendStatus(200))
    .catch((err)=>console.log(err));
};


const makeNewPost = (req,res)=>{
    const title = 'Add post'

    res.render(path.resolve(__dirname, '../views','newPost.ejs'),{title});
}

const sendNewPost = (req,res)=>{
    const { title, author, text } = req.body;
    const post = new Post({title, author, text});
    post
    .save()
    .then(res.redirect('/posts'))
    .catch((err)=>
    console.log(err)
    );
};

module.exports = {getPosts,getPost,deletePost,makeNewPost,sendNewPost};