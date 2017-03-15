const mysql = require('mysql');
const config = require('../../bin/config/_config.json'); // Existence is checked by app.js
const { db } = config;

class MySql {

    static query (query, opts = {}) {
        return new Promise((rsv, rr) => {
            const con = mysql.createConnection(db);

            con.connect((conErr) => {
                if (conErr) {
                    return rr(conErr);
                }

                const q = con.query(query, opts, (queryErr, rows) => {
                    if (queryErr) { return rr(queryErr); }

                    con.end((err) => {
                        if (err) { return rr(err); }
                        rsv(rows);
                    });
                });
            });
        })
    }

    static escape(opt) {
        return mysql.escape(opt);
    }

    static escapeId(opt) {
        return mysql.escapeId(opt);
    }
}

module.exports = MySql;