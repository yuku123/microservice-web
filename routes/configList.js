/**
 * Created by Wine on 2017/3/27.
 */
let express = require('express')
let router = express.Router()

router.get('/', function (req, res, next) {
  if (req.session.userInfo) {
    res.render('configList', {
      name: 'configList',
      userName: req.session.userInfo.userName
    })
  } else {
    res.json(200, {msg: '去登陆'})
  }

})

//router.get('/logout', logout.logout)

module.exports = router

