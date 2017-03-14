const express = require('express');
const router = express.Router();

const { contact } = require('./contact');

/* GET users listing. */
router.post('/', contact);

module.exports = router;
