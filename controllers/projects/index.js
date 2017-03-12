const express = require('express');
const router = express.Router();

const { find } = require('./find');

/* GET users listing. */
router.get('/', find);

module.exports = router;
