const router = require('express').Router()
const albumsQueries = require('../../db/albums')
const albumsRoutes = require('./albums')
const usersQueries = require('../../db/users')
const usersRoutes = require('./users')
const {
  getSimpleDate,
} = require('../utils')

router.use('/albums', albumsRoutes)
router.use('/users', usersRoutes)

router.get('/', (req, res) => {
  albumsQueries.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('common/error', {
        error,
      })
    }
    res.render('index/index', {
      albums,
    })
  })
})

router.get('/signup', (req, res) => {
  res.render('index/signup')
})

router.post('/signup', (req, res) => {
  const accountInfo = req.body
  const dateToday = new Date()
  const dateJoined = getSimpleDate(dateToday)
  usersQueries.getUsersByEmail(accountInfo.email, (error, userEmailInformation) => {
    if (error) {
      return res.status(500).render('common/error', {
        error,
      })
    } else if (userEmailInformation.length > 0) {
      return res.status(401).render('common/error', {
        error: {
          message: 'Email address already exists',
        },
      })
    }
    usersQueries.createUser(accountInfo, dateJoined, (error, accountNew) => {
      if (error) {
        return res.status(500).render('common/error', {
          error,
        })
      }
      return res.redirect(`/users/${accountNew[0].id}`)
    })
  })
})

router.get('/signin', (req, res) => {
  res.render('index/signin')
})

router.post('/signin', (req, res) => {
  const loginEmail = req.body.email
  const loginPassword = req.body.password
  usersQueries.getUsersByEmail(loginEmail, (error, userEmailInformation) => {
    if (error) {
      return res.status(500).render('common/error', {
        error,
      })
    } else if (!userEmailInformation || loginPassword !== userEmailInformation[0].password) {
      return res.status(401).render('common/error', {
        error: {
          message: 'Username and password do not match',
        },
      })
    }
    console.log('Logged in')
    req.session.user = userEmailInformation
    res.redirect('/')
  })
})

module.exports = router
