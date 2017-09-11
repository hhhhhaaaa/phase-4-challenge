const {client, _query} = require('./db')

client.connect()

function getAlbums(cb) {
  _query('SELECT * FROM album', [], cb)
}

function getAlbumsByID(albumID, cb) {
  _query('SELECT * FROM album WHERE id = $1', [albumID], cb)
}

module.exports = {
  getAlbums,
  getAlbumsByID,
}
