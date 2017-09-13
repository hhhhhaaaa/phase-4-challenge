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
  if (req.session.user) {
    const userSessionID = req.session.user[0].id;
    const userSession = req.session.user[0];
    albumsQueries.getAlbums((error, albums) => {
      if (error) {
        res.status(500).render('common/error', {
          error,
        })
      }
      res.render('index/index', {
        albums,
        userSessionID,
        userSession,
      })
    })
  } else {
    const userSessionID = null;
    const userSession = null;
    albumsQueries.getAlbums((error, albums) => {
      if (error) {
        res.status(500).render('common/error', {
          error,
        })
      }
      res.render('index/index', {
        albums,
        userSessionID,
        userSession,
      })
    })
  }
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
    } else if (userEmailInformation[0] !== undefined) {
      if (loginPassword !== userEmailInformation[0].password) {
        return res.status(401).render('common/error', {
          error: {
            message: 'Username and password do not match',
          },
        })
      }
      console.log('Logged in')
      req.session.user = userEmailInformation
      req.session.save()
      res.redirect(`/users/${userEmailInformation[0].id}`)
    }
    return res.status(401).render('common/error', {
      error: {
        message: 'Username and password do not match',
      },
    })
  })
})

router.get('/signout', (req, res) => {
  req.session.destroy()
  res.clearCookie('userInformation')
  res.redirect('/')
})

module.exports = router
