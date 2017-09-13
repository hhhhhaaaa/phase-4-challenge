const router = require('express').Router()
const albums = require('../../db/albums')

router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID
  if (req.session.user) {
    const userSessionID = req.session.user[0].id;
    const userSession = req.session.user[0];
    albums.getAlbumsByID(albumID, (error, albumsInfo) => {
      if (error) {
        res.status(500).render('error', {
          error,
        })
      } else {
        const album = albumsInfo[0]
        res.render('albums/album', {
          album,
          userSessionID,
          userSession,
        })
      }
    })
  } else {
    const userSessionID = null;
    const userSession = null;
    albums.getAlbumsByID(albumID, (error, albumsInfo) => {
      if (error) {
        res.status(500).render('error', {
          error,
        })
      } else {
        const album = albumsInfo[0]
        res.render('albums/album', {
          album,
          userSessionID,
          userSession,
        })
      }
    })
  }
})

module.exports = router
