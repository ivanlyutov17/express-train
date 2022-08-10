const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
const path = require('path');


const getContacts = (req, res) => {
    const title = 'Contact'
    Contact.find()
    .then((contacts)=>res.render(path.resolve(__dirname, '../views','contact.ejs'),{title,contacts}))
    .catch((err)=>console.log(err));
};

module.exports = getContacts;