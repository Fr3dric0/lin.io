const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.status(200).json({msg: 'respond with a resource'});
});

module.exports = router;
