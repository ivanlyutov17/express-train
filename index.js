const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const postApiRoutes = require('./routes/api-post-routes');

var morgan = require('morgan')
const app = express();



const PORT = 3000;

const database = 'mongodb+srv://ivanlyutov17:Reas2014@cluster0.az8lhgw.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose.connect(database,{useNewUrlParser: true, useUnifiedTopology:true})
.then((res) =>console.log('Connected to DB'))
.catch((err) =>console.log(err));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({extended: false}));


app.listen(PORT,err=>{
    err?console.log(err):console.log('Listening on port: '+PORT);
})
app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);


app.get('/',(req,res)=>{
    const title = 'Home'
    res.render(path.join(__dirname, 'views','index.ejs'),{title});
})

app.use((req,res)=>{    
    res.
    status(404).
    sendFile(path.join(__dirname, 'views','error.ejs'));
})