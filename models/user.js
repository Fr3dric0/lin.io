const sequelize = require('sequelize');

module.exports = {
    User: sequelize.define('user', {
        email: {
            type: sequelize.STRING
        },
        password: {
            type: sequelize.STRING
        },
        admin: {
            type: sequelize.BOOLEAN
        }
    })
};
