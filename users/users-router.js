const express = require('express')

const Users = require('./users-model')
const restricted = require('./restricted-middleware')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        console.log('users-router', req.session)
        const users = await Users.get()
        if (users) { return res.status(200).json(users) }
        res.status(404).json({ message: 'get error' })
    } catch(e) {
        res.status(500).json({ message: 'db error' })
    }
})

router.get('/logout', (req, res) => {
    if (req.session && req.session.username) {
        req.session.destroy(err => {
            if (err) {
                return res.status(400)
            } else {
                return res.status(200)
            }
        })
    }
    res.end()
})

module.exports = router;