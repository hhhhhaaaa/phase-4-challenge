const router = require('express').Router()
const db = require('../../db/albums')

router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      res.render('albums/album', {album})
    }
  })
})

module.exports = router
