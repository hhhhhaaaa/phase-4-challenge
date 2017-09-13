const router = require('express').Router()
const users = require('../../db/users')

router.get('/:userID', (req, res) => {
  const userID = req.params.userID
  if (req.session.user) {
    const userSessionID = req.session.user[0].id;
    const userSession = req.session.user[0];
    users.getUsersByID(userID, (error, userInfo) => {
      if (error) {
        res.status(500).render('common/error', {
          error
        })
      } else {
        const user = userInfo[0]
        console.log(user)
        console.log('dateJoined')
        res.render('users/user', {
          user,
          userSessionID,
          userSession,
        })
      }
    })
  } else {
    const userSessionID = null;
    const userSession = null;
    users.getUsersByID(userID, (error, userInfo) => {
      if (error) {
        res.status(500).render('common/error', {
          error
        })
      } else {
        const user = userInfo[0]
        console.log('dateJoined')
        res.render('users/user', {
          user,
          userSessionID,
          userSession,
        })
      }
    })
  }
})

module.exports = router
