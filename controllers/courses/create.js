const Course = require('../../models/courses');
const requiredFields = ['name', 'description', 'role'];

const create = [

];

function checkFields (req, res, next) {

    for (field of requiredFields) {
        if (!req.body[field]) {
            const err = new Error(`[Course Error] Missing required field '${field}'`);
            err.status = 400;
            return next(err);
        }
    }

    next();
}



function saveToDb (req, res, next) {
    const { name, description, motivation, github, frameworks, client, page, role, course } = req.body;

    Project.create({
        name,
        description,
        motivation,
        github,
        //frameworks,
        client,
        page,
        role,
        course
    })
        .then((results) => next())
        .catch( err => next(err));

}

function getRecord (req, res, next) {
    const { name } = req.body;

    Project.find({name}, 1)
        .then((project) => {
            req.project = project;
            next();
        })
        .catch(err => next(err));
}

module.exports = { create };