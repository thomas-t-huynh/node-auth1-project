const express = require('express')
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)

const userRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

const auth = require('./middleware/auth')

// secure to true for https - true for production
const sessionConfig = {
    name: 'doubleChocolateChip',
    secret: 'extra chocolate',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore({
        knex: require('./data/dbconfig.js'),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

const server = express()

server.use(express.json())
server.use(session(sessionConfig))
server.use(auth)

server.use('/api/users', userRouter)
server.use('/api/auth', authRouter)

module.exports = server