const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const routes = require('./server/routes')

const port = process.env.PORT || 3000

const app = express()

require('ejs')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(session({
  name: 'userInformation',
  secret: 'a challenge approaches',
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
}))
app.use(cookieParser())

app.use('/', routes)

app.use((req, res) => {
  res.status(404).render('common/not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
