
const Course = require('../../models/courses');

const find = [
    findAll
];

function findAll (req, res, next) {
    Course.find({})
        .then(courses => res.status(200).json(courses))
        .catch(err => next(err));
}

module.exports = { find };