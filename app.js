const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

////////////////////////////////////////
//             API CONFIG             //
////////////////////////////////////////
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


////////////////////////////////////////
//            STATIC PATHS            //
////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'client', 'dist'))); // Angular
app.use('/resource', express.static(path.join(__dirname, 'resources'))); // Resources folder pref: '/resource'




app.use((req, res, next) => {
    const _config = require('./bin/config/_config.json');

    if (!_config) {
        throw new Error(`Missing config file '_config.json'!`);
    }
    req.config = _config;
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

    res.status(err.status || 500).json(e);
});


module.exports = app;
