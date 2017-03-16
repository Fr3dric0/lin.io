const express = require('express');
const router = express.Router();



router.all('*', (req, res, next) => {
    const err = new Error('Path not found');
    err.status = 404;
    next(err);
});

module.exports = router;
