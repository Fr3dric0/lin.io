const sequelize = require('sequelize');

module.exports = {
    About: sequelize.define('About', {
        owner: {
            type: sequelize.STRING
        },
        description: {
            type: sequelize.STRING
        },
        occupation: {
            type: sequelize.BOOLEAN
        },
        school: {
            type: sequelize.STRING
        },
        birthdate: {
            type: sequelize.DATE
        }
    })
};
