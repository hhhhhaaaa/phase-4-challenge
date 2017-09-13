const {_query} = require('./db')

function createReview (reviewInfo, dateCreated, albumID, userID, cb) {
  return _query('INSERT INTO review (body, date_created, album_id, account_id) VALUES ($1, $2, $3, $4)', [reviewInfo, dateCreated, albumID, userID], cb)
}

function getReviews (cb) {
  return _query('SELECT * FROM review LIMIT 3 ORDER BY date_created RETURNING *', [], cb)
}

function getReviewsByUserID (userID, cb) {
  return _query('SELECT * FROM review WHERE user_id = $1', [userID], cb)
}

function getReviewsByAlbumID (albumID, cb) {
  return _query('SELECT * FROM review WHERE album_id = $1', [albumID], cb)
}

module.exports = {

}
