const router = require('express').Router()
const albums = require('../../db/albums')
const reviews = require('../../db/reviews')
const users = require('../../db/users')
const {getSimpleDate} = require('../utils')

router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID
  if (req.session.user) {
    const userSessionID = req.session.user[0].id
    const userSession = req.session.user[0]
    albums.getAlbumsByID(albumID, (error, albumsInfo) => {
      if (error) {
        res.status(500).render('common/error', {
          error,
        })
      }
      const album = albumsInfo[0]
      reviews.getReviewsByAlbumID(album.id, (error, reviewsInfo) => {
        if (error) {
          res.status(500).render('common/error', {
            error,
          })
        }
        res.render('albums/album', {
          album,
          userSessionID,
          userSession,
          reviewsInfo,
        })
      })
    })
  }
  const userSessionID = null
  const userSession = null
  albums.getAlbumsByID(albumID, (error, albumsInfo) => {
    if (error) {
      res.status(500).render('common/error', {
        error,
      })
    }
    const album = albumsInfo[0]
    reviews.getReviewsByAlbumID(album.id, (error, reviewsInfo) => {
      if (error) {
        res.status(500).render('common/error', {
          error,
        })
      }
      res.render('albums/album', {
        album,
        userSessionID,
        userSession,
        reviewsInfo,
      })
    })
  })
})

router.get('/:albumID/reviews/new', (req, res) => {
  const albumID = req.params.albumID
  if (req.session.user) {
    res.render('reviews/new', {
      albumID,
    })
  } else {
    return res.status(401).render('common/error', {
      error: {
        message: 'User must be logged in before submitting a review',
      },
    })
  }
})

router.post('/:albumID/reviews/new', (req, res) => {
  const reviewInfo = req.body.body
  const dateToday = new Date()
  const dateCreated = getSimpleDate(dateToday)
  const albumID = req.params.albumID
  const userID = req.session.user[0].id
  reviews.createReview(reviewInfo, dateCreated, albumID, userID, (error, reviewNew) => {
    if (error) {
      return res.status(500).render('common/error', {
        error,
      })
    }
    return res.redirect(`/albums/${albumID}`)
  })
})


module.exports = router
