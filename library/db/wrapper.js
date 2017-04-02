/**
 * @author      Fredrik F. Lindhagen
 * @created     2017-03-15
 *
 * wrapper is a set of helper functions for the database-module (in the same folder).
 * Lets the caller generate queries more "programatically", where
 * 'WHERE' is an object {'key': 'val'}, filter 'SELECT ?' is an array '?' = ['id', 'name']
 * and 'LIMIT' is a number
 * */
const MySql = require('../../library/db');

/**
 * @param   {string}    str     The query filter, should not surpass the 'FROM' value
 *                              'WHERE', and 'LIMIT' is generated automatically in the string
 * @param   {object}    where?  The where query. Key is key and value is the value
 * @param   {array}     filter? Keys expected to be returned from the database
 * @param   {number}    limit?  # of rows expected returned
 *
 * Generates and executes the query based on the values provided.
 * One can choose to omit several of the filters, if wanted
 * E.x. query("SELECT ? FROM some_table", ['id']) --> [{'id': 1}, {'id': 2}, ...]
 * E.x. query("SELECT * FROM some_table", 20) --> [{...}, {...}, ...].length() <= 20
 *
 * @return  {Promise}
 * */
function query (str, where, filter, limit) {
    return new Promise((rsv, rr) => {
        let opt = [];

        if (!isArray(filter) && typeof filter === 'number') {
            limit = filter; // Use filter as limiter
            filter = undefined; // Reset filter
        }

        if (isArray(where)) {
            filter = where; // Where is most likely a filter
            where = undefined; // Reset where
        } else if (typeof where === 'number') {
            limit = where;
            where = undefined;
        }

        // TODO - Find a SECURE whay to do this, dynamically
        // TODO - Can already spot the dangers
        // Have tested to insert 'WHERE 1=1;' which the database actually
        // protected against
        str = str.replace("?", generateFilter(filter));

        if (where) {
            opt.push(where);
            str += ' WHERE ? ';
        }

        if (limit) {
            str += ` LIMIT ?`;
            opt.push(parseInt(limit));
        }

        MySql.query(`${str};`, opt)
            .then(r => rsv(r))
            .catch(e => rr(e));
    });
}


function generateFilter (filter) {
    filter = !filter || filter.length < 1 ? '*' : filter;
    return MySql.escape(filter).split("'").join(""); // Remove all ' in the escaped string
}

function isArray(list) {
    return Object.prototype.toString.call(list) === '[object Array]';
}

module.exports = { query, isArray };