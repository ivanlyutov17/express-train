const express =require('express');
const getContacts = require('../controllers/contacts-controller')

const router = express.Router();

router.get('/contact',getContacts)

module.exports = router;
