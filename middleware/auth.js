const restricted = require('../users/restricted-middleware')

function auth (req, res, next) {
    if (req.originalUrl.includes('/api/users')) {
        restricted(req, res, next)
    } else {
        next()
    }
}

module.exports = auth
