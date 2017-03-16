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
            const err = new Error(`[Route Error] Illegal URL ${req.host}${req.originalUrl}`);
            err.status = 404;
            return next(err);
        }
    }


    next();
}