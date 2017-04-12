const express = require('express');
const router = express.Router();

const { find } = require('./find');
const { create } = require('./create');

/* GET users listing. */
router.get('/', find);
router.post('/', create);

module.exports = router;
