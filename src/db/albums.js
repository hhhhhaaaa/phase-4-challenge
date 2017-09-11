const {client, _query} = require('./db')

client.connect()

function getAlbums(cb) {
  _query('SELECT * FROM albums', [], cb)
}

function getAlbumsByID(albumID, cb) {
  _query('SELECT * FROM albums WHERE id = $1', [albumID], cb)
}

module.exports = {
  getAlbums,
  getAlbumsByID,
}
