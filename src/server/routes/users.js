const router = require('express').Router()
const reviews = require('../../db/reviews')
const users = require('../../db/users')

router.get('/:userID', (req, res) => {
  const userID = req.params.userID
  if (req.session.user) {
    const userSessionID = req.session.user[0].id
    const userSession = req.session.user[0]
    users.getUsersByID(userID, (error, userInfo) => {
      if (error) {
        res.status(500).render('common/error', {
          error,
        })
      }
      const user = userInfo[0]
      reviews.getReviewsByUserID(userID, (error, reviewsInfo) => {
        if (error) {
          res.status(500).render('common/error', {
            error,
          })
        }
        res.render('users/user', {
          user,
          userSessionID,
          userSession,
          reviewsInfo,
        })
      })
    })
  }
  const userSessionID = null
  const userSession = null
  users.getUsersByID(userID, (error, userInfo) => {
    if (error) {
      res.status(500).render('common/error', {
        error,
      })
    }
    const user = userInfo[0]
    reviews.getReviewsByUserID(userID, (error, reviewsInfo) => {
      if (error) {
        res.status(500).render('common/error', {
          error,
        })
      }
      res.render('users/user', {
        user,
        userSessionID,
        userSession,
        reviewsInfo,
      })
    })
  })
})

module.exports = router
