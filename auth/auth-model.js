const db = require('../data/dbconfig')

module.exports = {
    add,
    findBy
}

function add(user) {
    return db('users').insert(user)
        .then(() => user.username)
}

function findBy(username) {
    return db('users').where({username})
}