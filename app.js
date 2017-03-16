const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const serverIp = '68.66.240.106';

////////////////////////////////////////
//             API CONFIG             //
////////////////////////////////////////
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'client', 'dist'))); // Angular
app.use('/resource', express.static(path.join(__dirname, 'resources'))); // Resources folder pref: '/resource'

const _config = require('./bin/config/_config.json');

if (!_config) {
    throw new Error(`Missing config file '_config.json'!`);
}

////////////////////////////////////////
//            CONFIG DATA             //
////////////////////////////////////////
app.use((req, res, next) => {
    req.config = _config;
    next();
});


const Mailgun = require('mailgun-js')({
    apiKey: _config.mailgun.secret,
    domain: _config.mailgun.domain
});

app.use((req, res, next) => {
    req.email = {
        to: _config.mailgun.address,
        from: 'server@lindhagen.io'
    };
    req.email.Mailgun = Mailgun;
    next();
});


////////////////////////////////////////
//             API ROUTES             //
////////////////////////////////////////
const api = '/api';
const controller = './controllers';

app.use(`${api}/users`, require(`${controller}/users`));
app.use(`${api}/about`, require(`${controller}/about`));
app.use(`${api}/courses`, require(`${controller}/courses`));
app.use(`${api}/projects`, require(`${controller}/projects`));
app.use(`${api}/contact`, require(`${controller}/contact`));
app.use(`${api}`, require(`${controller}`));


////////////////////////////////////////
//           RESOURCE ROUTER          //
//                                    //
// Responsible for catching 404 err   //
// for the static resources folder.   //
// Thus preventing us from sending    //
// the index.html file every time a   //
// resource WASN'T found              //
////////////////////////////////////////
app.all('/resource/*', (req, res) => {
    res.status(404).send();
});


////////////////////////////////////////
//           CLIENT ROUTER            //
//                                    //
// Responsible for serving the        //
// angular site on all non api- and   //
// resources- routes                  //
////////////////////////////////////////
app.all('*', (req, res) => {
    // Sends the HTML file, instead of using a view-engine
    res.sendFile(path.join('client', 'dist', 'index.html'), {root: __dirname});
});


////////////////////////////////////////
//           ERROR HANDLER            //
////////////////////////////////////////
app.use((err, req, res, next) => {
    const e = { error: err.message };

    if (app.get('env') === 'development' && err.stack) {
        e.stack = err.stack;
    }

    if (err.description) {
        e.description = err.description;
    }

    // TODO - Setup error logging if status codes are >=500 or unknown

    if (err.message.startsWith('ER_ACCESS_DENIED_ERROR') ||
        err.message.includes('ENOTFOUND')) {
        const timestamp = new Date();

        req.email.Mailgun.messages().send({
            from: 'server@lindhagen.io',
            to: req.email.to,
            subject: '[lindhagen.io] Database Connection Error',
            text: `
            Database Connection Error\n\n
            Timestamp: ${timestamp}\n
            IP: ${serverIp}\n
            Error Message: \n\n
            ${err.message}`,
            html: `
            <h1>Database Connection Error</h1>
            
            <table>
                <tr><td>Timestamp</td><td>${timestamp}</td></tr>
                <tr><td>IP</td><td>${serverIp}</td></tr>
            </table>
            <h2>Error message</h2>
            <pre>${err.message}</pre>`
        }, (err, body) => {
            if (err) { return console.error(`\n${timestamp} - [FATAL ERROR] Failed to send email warning\n`); }
            console.error(`${timestamp} - [Database Error] Could not connect to database, email warning has been sendt`);
        });

        e.error = `Server error`;
        e.description = 'If possible please contact the administrators of the site';
        err.status = 500;
    }


    res.status(err.status || 500).json(e);
});


module.exports = app;
