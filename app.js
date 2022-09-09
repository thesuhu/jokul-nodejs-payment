const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mtz = require('moment-timezone')
const rfs = require('rotating-file-stream')
const basedir = require('app-root-path')
const writelog = require('@thesuhu/writelog')
const { httpLogConsole } = require('@thesuhu/colorconsole')

const msg = require('./config/message-code')
const routes = require('./routes/routes')
// const passport = require('./middleware/passport')
const { limit_json, limit_urlencode, interval, size, env } = require('./config/key')

const timezone = 'Asia/Jakarta' // change with yours local time zone

// morgan
morgan.token('date', (req, res, tz) => {
    return mtz().tz(timezone).format('DD/MMM/YYYY:HH:mm:ss ZZ')
})

var accessLogStream = rfs.createStream('access.log', {
    size: size,
    interval: interval,
    compress: 'gzip',
    path: basedir + '/logs'
})

morgan.format('apache', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')

app.use(morgan('apache', { "stream": accessLogStream }))

// passport
// app.use(passport.initialize())

// cors
app.use(cors())

// parser
app.use(express.urlencoded({ limit: limit_urlencode, extended: true }))
app.use(express.json({ limit: limit_json }))

// log request for dev
app.use((req, res, next) => {
    if (env == 'dev') httpLogConsole(req)
    next()
})

// routes
app.use('/', routes)

// not found
app.use(async function (req, res) {
    var errorMessage = `${req.ip} - - [${mtz().tz(timezone).format()}] \"${req.method} ${req.originalUrl}\" Page not found (404)`
    writelog.error(errorMessage)
    return res.status(404).json({
        success: "false",
        message: msg.MSG40401,
        code: "40401",
        data: {}
    })
})

module.exports = app