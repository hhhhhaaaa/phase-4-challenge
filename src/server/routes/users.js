const router = require('express').Router()
const users = require('../../db/users')

router.get('/:userID', (req, res) => {
  if (req.session.user) {
    const userID = req.session.user.id;
    const userSession = req.session.user;
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
          userID,
          userSession,
        })
      }
    })
  } else {
    const userID = null;
    const userSession = null;
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
          userID,
          userSession,
        })
      }
    })
  }
})

module.exports = router
