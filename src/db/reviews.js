const {_query} = require('./db')

function createReview(reviewInfo, dateCreated, albumID, userID, cb) {
  return _query('INSERT INTO review (body, date_created, album_id, account_id) VALUES ($1, $2, $3, $4)', [reviewInfo, dateCreated, albumID, userID], cb)
}

function getReviews(cb) {
  return _query('SELECT review.*, album.title, account.account_name FROM review JOIN album ON album.id = review.album_id JOIN account ON account.id = review.account_id ORDER BY review.id DESC LIMIT 3;', [], cb)
}

function getReviewsByAlbumID(albumID, cb) {
  return _query('SELECT review.*, account.account_name FROM review JOIN account ON account.id = review.account_id WHERE album_id = $1 ORDER BY review.id DESC', [albumID], cb)
}

function getReviewsByUserID(userID, cb) {
  return _query('SELECT review.*, album.title FROM review JOIN album ON album.id = review.album_id WHERE account_id = $1 ORDER BY review.id DESC;', [userID], cb)
}

module.exports = {
  createReview,
  getReviews,
  getReviewsByAlbumID,
  getReviewsByUserID,
}
