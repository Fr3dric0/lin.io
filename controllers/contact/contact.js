const request = require('request');
const Blacklist = require('../../models/blacklist');
const Contact = require('../../models/contact');
const requiredFields = ['captcha', 'email', 'subject', 'message'];

const contact = [
    checkFields,
    checkBlacklist,
    verifyCaptcha,
    captchaSuccess,
    sendMail,
    saveToDb,
    returnData
];

function checkFields (req, res, next) {

    for (field of requiredFields) {
        if (!req.body[field]) {
            const err = new Error(`[Contact Error] Missing required field '${field}'`);
            err.status = 400;
            return next(err);
        }
    }

    req.captcha = {};
    next();
}

function checkBlacklist (req, res, next) {
    const { email } = req.body;

    Blacklist.find({'email': email})
        .then((rows) => {
            if (rows.length > 0) {
                const err = new Error(`[Contact Email] Blacklisted user`);
                err.description = rows[0].custom_message;
                err.status = 418;
                return next(err);
            }
            next();
        })
        .catch( err => next(err));
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

    next();
}

function sendMail (req, res, next) {
    const { subject, message } = req.body;
    let from = req.body.email;
    const { Mailgun, to } = req.email;

    if (req.body.name) {
        from = `${req.body.name} <${from}>`;
    }

    const options = {
        from,
        to,
        subject: `[Lindhagen IT: User Contact] ${subject}`,
        text: message,
        html: `<h1>${subject}</h1>
        <p>${message}</p>
        `
    };

    Mailgun.messages().send(options, (err, body) => {
        if (err) { return next(err);}
        next();
    });
}

function saveToDb (req, res, next) {
    // TODO - Store email request in the database
    const { email, name, subject, message } = req.body;

    Contact.create({
        subject,
        message,
        from: email,
        name: name ? name : null
    })
        .then((results) => next())
        .catch( err => next(err));

}

function returnData (req, res, next) {
    res.status(200).json({success: true});
}


module.exports = { contact };