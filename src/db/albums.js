const {_query} = require('./db')

function getAlbums(cb) {
  return _query('SELECT * FROM album', [], cb)
}

function getAlbumsByID(albumID, cb) {
  return _query('SELECT * FROM album WHERE id = $1', [albumID], cb)
}

module.exports = {
  getAlbums,
  getAlbumsByID,
}
