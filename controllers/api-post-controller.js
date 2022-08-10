const Post = require('../models/post'); 


const getPosts = (req,res)=>{
    Post
    .find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => handleError(res, error));
};


const getPost = (req,res)=>{
    Post
    .findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};


const deletePost = (req,res)=>{
    Post
    .findByIdAndDelete(req.params.id)
    .then(()=>res.status(200).json(req.params.id))
    .catch((err)=>console.log(err));
};


const makeNewPost = (req,res)=>{
    const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));

}

const sendNewPost = (req,res)=>{
    const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

module.exports = {getPosts,getPost,deletePost,makeNewPost,sendNewPost};