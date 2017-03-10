const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.status(200).json({ msg: "hello world" })
});


router.all('*', (req, res, next) => {
    const err = new Error('Path not found');
    err.status = 404;
    next(err);
});

module.exports = router;
