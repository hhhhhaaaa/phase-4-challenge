const router = require('express').Router()
const reviews = require('../../db/reviews')

router.get('/new', (req, res) => {
  res.render('reviews/new')
})

module.exports = router
