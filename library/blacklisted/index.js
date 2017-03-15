/**
 *  Blacklisted is a library connected with `contact` to ensure no blacklisted user,
 *  is given the possibility to make contact
 *
 *  A blacklisted object has the following format:
 *
 *  {
 *      "name"?: String,
 *      "email": String,
 *      "reason": String,
 *      "custom_message": String
 *  }
 * */
const fs = require('fs');

const blackedOut = require('../../bin/config/_blacklisted.json') || [];

function blacklisted(email) {
    return new Promise((rsv, rr) => {

    });
}