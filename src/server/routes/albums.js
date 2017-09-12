const router = require('express').Router()
const albums = require('../../db/albums')

router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID
  albums.getAlbumsByID(albumID, (error, albumsInfo) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albumsInfo[0]
      res.render('albums/album', {album})
    }
  })
})

module.exports = router
