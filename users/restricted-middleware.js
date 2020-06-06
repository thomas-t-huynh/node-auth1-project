module.exports = (req, res, next) => {
    if (req.session.id) {
        next()
    } else {
        res.status(403).json({ message: 'invalid request' })
    }
}