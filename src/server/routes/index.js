const router = require('express').Router()
const albumsQueries = require('../../db/albums')
const albumsRoutes = require('./albums')

router.use('/albums', albumsRoutes)

router.get('/', (req, res) => {
  albumsQueries.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('common/error', {error})
    } else {
      res.render('common/index', {albums})
    }
  })
})

router.use((req, res) => {
  res.status(404).render('common/not_found')
})

module.exports = router