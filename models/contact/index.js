const Wrapper= require('../../library/db/wrapper');
const MySql = require('../../library/db');
const table = 'contact';

const queries = {
    find: `SELECT ? FROM ${table}`,
    update: `UPDATE ${table} SET ?`,
    create: `INSERT INTO ${table} (?) VALUES (?)`,
    createNoKeys: `INSERT INTO ${table} VALUES (?)`
};

function find (where, filter, limit) {
    return Wrapper.query(queries.find, where, filter, limit);
}

function create (data) {
    return new Promise((rsv, rr) => {
        let query;
        let options = [];
        if (Wrapper.isArray(data)) {
            query = queries.createNoKeys;
            options.push(data);
        } else {
            query = queries.create;
            query = query.replace('?', MySql.escapeId(keys(data)));

            options.push(values(data));
        }

        MySql.query(query, options)
            .then(result => rsv(result))
            .catch(err => rr(err));
    })
}


function keys (obj) {
    let k = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            k.push(key);
        }
    }
    return k;
}

function values (obj) {
    let v = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            v.push(obj[key]);
        }
    }
    return v;
}


module.exports = { find, create };