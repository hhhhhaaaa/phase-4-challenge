const {_query} = require('./db')

function createUser(accountInfo, dateJoined, cb) {
  _query('INSERT INTO account (account_name, email, date_joined, password) VALUES ($1, $2, $3, $4) RETURNING *', [accountInfo.name, accountInfo.email, dateJoined, accountInfo.password], cb)
}

function getUsersByID(userID, cb) {
  _query('SELECT * FROM account WHERE id = $1', [userID], cb)
}

function getUsersByEmail(userEmail, cb) {
  _query('SELECT * FROM account WHERE email = $1', [userEmail], cb)
}

module.exports = {
  createUser,
  getUsersByID,
  getUsersByEmail,
}
