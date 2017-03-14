const request = require('request');

const contact = [
    checkFields,
    verifyCaptcha,
    captchaSuccess
];

function checkFields (req, res, next) {
/*
    if (req.body.email === 'ffl_52@hotmail.com') {
        const err = new Error('[Contact Error] Fuck off Joakim');
        err.status = 403;
        return next(err);
    }*/

    if (!req.body.captcha) {
        const err = new Error('[Contact Error] Missing captcha string!');
        err.status = 403;
        return next(err);
    }


    req.captcha = {};
    next();
}

function verifyCaptcha (req, res, next) {
    const { secret, path } = req.config.recaptcha;

    request.post(path, {
        contentType: 'application/json',
        form: {
        secret,
        response: req.body.captcha,
        remoteip: req.ip}},
        (err, httpRes, body) => {
            if (err) {
                return next(err);
            }

            let success = false;
            try {
                const data = JSON.parse(body);
                success = data.success;
            } catch (e) {
                return next(e);
            }

            req.captcha.success = success;
            next();
        });
}

function captchaSuccess (req, res, next) {
    const { success } = req.captcha;

    if (!success) {
        const err = new Error('[Contact Error] Could not verify captcha, please take test again');
        err.status = 403;
        return next(err);
    }

    res.status(200).json({success: true});
}

module.exports = { contact };