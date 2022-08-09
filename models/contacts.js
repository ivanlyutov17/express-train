const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name:{
        type:'string',
        required:true,
    },
    link:{
        type:'string',
        required:true,
    },
});


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;