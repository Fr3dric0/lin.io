const path = require('path');

const keywords = [
    'phpmyadmin'
];

module.exports = [
    denyKeywords
];

function denyKeywords (req, res, next) {
    const { params } = req;

    for (key of keywords) {
        if (req.originalUrl.includes(key)) {
            return res.status(404).sendFile(
                'denied.webp',
                {root: path.join(__dirname, '../../../resources')});
        }
    }


    next();
}