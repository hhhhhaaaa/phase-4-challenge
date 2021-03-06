const router = require('express').Router()
const albumsQueries = require('../../db/albums')
const albumsRoutes = require('./albums')
const usersQueries = require('../../db/users')
const usersRoutes = require('./users')
const reviewsQueries = require('../../db/reviews')
const {getSimpleDate} = require('../utils')

router.use('/albums', albumsRoutes)
router.use('/users', usersRoutes)

router.get('/', (req, res) => {
  if (req.session.user) {
    const userSessionID = req.session.user[0].id
    const userSession = req.session.user[0]
    reviewsQueries.getReviews((error, reviews) => {
      if (error) {
        res.status(500).render('common/error', {
          error,
        })
      }
      albumsQueries.getAlbums((error, albums) => {
        if (error) {
          res.status(500).render('common/error', {
            error,
          })
        }
        res.render('index/index', {
          albums,
          reviews,
          userSessionID,
          userSession,
        })
      })
    })
  }
  const userSessionID = null
  const userSession = null
  reviewsQueries.getReviews((error, reviews) => {
    if (error) {
      res.status(500).render('common/error', {
        error,
      })
    }
    albumsQueries.getAlbums((error, albums) => {
      if (error) {
        res.status(500).render('common/error', {
          error,
        })
      }
      res.render('index/index', {
        albums,
        reviews,
        userSessionID,
        userSession,
      })
    })
  })
})

router.get('/signup', (req, res) => {
  if (req.session.user) {
    const userSessionID = req.session.user[0].id
    const userSession = req.session.user[0]
    res.render('index/signup', {
      userSessionID,
      userSession,
    })
  }
  const userSessionID = null
  const userSession = null
  res.render('index/signup', {
    userSessionID,
    userSession,
  })
})

router.post('/signup', (req, res) => {
  const accountInfo = req.body
  const dateToday = new Date()
  const dateJoined = getSimpleDate(dateToday)
  usersQueries.getUsersByEmail(accountInfo.email, (error, userEmailInfo) => {
    if (error) {
      return res.status(500).render('common/error', {
        error,
      })
    } else if (userEmailInfo.length > 0) {
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
  if (req.session.user) {
    const userSessionID = req.session.user[0].id
    const userSession = req.session.user[0]
    res.render('index/signin', {
      userSessionID,
      userSession,
    })
  }
  const userSessionID = null
  const userSession = null
  res.render('index/signin', {
    userSessionID,
    userSession,
  })
})

router.post('/signin', (req, res) => {
  const loginEmail = req.body.email
  const loginPassword = req.body.password
  usersQueries.getUsersByEmail(loginEmail, (error, userEmailInfo) => {
    if (error) {
      return res.status(500).render('common/error', {
        error,
      })
    } else if (userEmailInfo[0] !== undefined) {
      if (loginPassword !== userEmailInfo[0].password) {
        return res.status(401).render('common/error', {
          error: {
            message: 'Username and password do not match',
          },
        })
      }
      console.log('Logged in')
      req.session.user = userEmailInfo
      req.session.save()
      return res.redirect(`/users/${userEmailInfo[0].id}`)
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
