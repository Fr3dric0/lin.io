const express = require('express');
const router = express.Router();

const { find } = require('./find');

router.get('/', find);

module.exports = router;
