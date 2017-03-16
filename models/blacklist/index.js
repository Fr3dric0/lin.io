const Wrapper = require('../../library/db/wrapper');

const table = 'blacklist';
const findQuery = `SELECT ? FROM ${table}`;


/**
 * @param   {object}    where?  Optional. Key is the WHERE key, and the value is the WHERE value
 * @param   {array}     filter? Optional. Contains what key values you want returned
 * @param   {number}    limit   Optional. The limiter of for the query.
 *
 * Generates a query based on the parameter values
 *
 * */
function find(where, filter, limit) {
    return Wrapper.query(findQuery, where, filter, limit)
}

module.exports = { find };