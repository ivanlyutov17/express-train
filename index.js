const express = require('express');
const path = require('path');
const validator = require('./middlewares');
const mongoose = require('mongoose');
const Post = require('./models/post'); 
const Contact = require('./models/contacts');

var morgan = require('morgan')
const app = express();



const PORT = 3000;

const database = 'mongodb+srv://ivanlyutov17:Reas2014@cluster0.az8lhgw.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose.connect(database,{useNewUrlParser: true, useUnifiedTopology:true})
.then((res) =>console.log('Connected to DB'))
.catch((err) =>console.log(err));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({extended: false}));

let postData = {};
let posts = [];

app.listen(PORT,err=>{
    err?console.log(err):console.log('Listening on port: '+PORT);
})

app.get('/',(req,res)=>{
    const title = 'Home'
    res.render(path.join(__dirname, 'static','index.ejs'),{title});
})

app.get('/posts',(req,res)=>{
    const title = 'Posts'
    Post
    .find()
    .sort({createdAt:-1})
    .then((posts)=>res.render(path.join(__dirname, 'static','posts.ejs'),{title,posts}))
    .catch((err)=>console.log(err));
})

app.delete('/posts/:id',(req,res)=>{
    Post
    .findByIdAndDelete(req.params.id)
    .then((result)=>res.sendStatus(200))
    .catch((err)=>console.log(err));
});

app.post('/newPost',(req,res)=>{
    const { title, author, text } = req.body;
    const post = new Post({title, author, text});
    post
    .save()
    .then(res.redirect('/posts'))
    .catch((err)=>
    console.log(err)
    );
})

app.get('/newPost',(req,res)=>{
    const title = 'Add post'

    res.render(path.join(__dirname, 'static','newPost.ejs'),{title});
})

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    Post
      .findById(req.params.id)
      .then(post => res.render(path.join(__dirname, 'static','post.ejs'), { post, title }))
      .catch((error) => {
        console.log(error);
        res.render(path.join(__dirname, 'static','error.ejs')), { title: 'Error' }});
    });


app.get('/contact',(req,res)=>{
    const title = 'Contact'
    Contact.find()
    .then((contacts)=>res.render(path.join(__dirname, 'static','contact.ejs'),{title,contacts}))
    .catch((err)=>console.log(err));
})

app.use((req,res)=>{    
    res.
    status(404).
    sendFile(path.join(__dirname, 'static','error.ejs'));
})