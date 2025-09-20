// config/session.js
const MongoStore = require('connect-mongo');

module.exports = {
    secret: process.env.SESSION_SECRET || 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2 // 2 hours
    }
};