const router = require('express').Router()
const users = require('../../db/users')

router.get('/:userID', (req, res) => {
  const userID = req.params.userID
  users.getUsersByID(userID, (error, userInfo) => {
    if (error) {
      res.status(500).render('common/error', {error})
    } else {
      const user = userInfo[0]
      console.log(user)
      console.log('dateJoined')
      res.render('users/user', {user})
    }
  })
})

module.exports = router
