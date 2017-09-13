const router = require('express').Router()
const albums = require('../../db/albums')

router.get('/:albumID', (req, res) => {
  if (req.session.user) {
    const userID = req.session.user.id;
    const userSession = req.session.user;
    const albumID = req.params.albumID
    albums.getAlbumsByID(albumID, (error, albumsInfo) => {
      if (error) {
        res.status(500).render('error', {
          error,
        })
      } else {
        const album = albumsInfo[0]
        res.render('albums/album', {
          album,
          userID,
          userSession,
        })
      }
    })
  } else {
    const userID = null;
    const userSession = null;
    const albumID = req.params.albumID
    albums.getAlbumsByID(albumID, (error, albumsInfo) => {
      if (error) {
        res.status(500).render('error', {
          error,
        })
      } else {
        const album = albumsInfo[0]
        res.render('albums/album', {
          album,
          userID,
          userSession,
        })
      }
    })
  }
})

module.exports = router
