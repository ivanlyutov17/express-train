const express = require('express');
const path = require('path');
const validator = require('./middlewares');

var morgan = require('morgan')
const app = express();

const PORT = 3000;

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
    res.render(path.join(__dirname, 'static','posts.ejs'),{title,posts});
})
app.post('/newPost',(req,res)=>{
    const { title, author, text } = req.body;
    postData = {
      id: new Date(),
      date: (new Date()).toLocaleDateString(),
      title,
      author,
      text,
    };
    let page = validator(postData);
    if (page !== 'error.ejs') posts.push(postData);
    res.setHeader("Content-Type", "text/html");
    page !== 'error.ejs'?    res.redirect('/posts'):
    res.render(path.join(__dirname, 'static','error.ejs'));

})
app.get('/newPost',(req,res)=>{
    const title = 'Add post'

    res.render(path.join(__dirname, 'static','newPost.ejs'),{title});
})

app.get('/contact',(req,res)=>{
    const title = 'Contact'

    res.render(path.join(__dirname, 'static','contact.ejs'),{title});
})

app.use((req,res)=>{    
    res.
    status(404).
    sendFile(path.join(__dirname, 'static','error.ejs'));
})