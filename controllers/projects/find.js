
const Project = require('../../models/project');

const find = [
    findAll
];

function findAll (req, res, next) {
    Project.find()
        .then( results => res.status(200).json(results))
        .catch( err => next(err));
}


module.exports = { find };