var express = require('express');
var router = express.Router();

//var logout = require('./logout')

router.get('/', function (req, res, next) {
  if (req.session.userInfo){
    res.render('reportList', {
      name: 'reportList',
      userName:req.session.userInfo.userName
    })
  } else {
    res.json(200,{msg:'去登陆'})
  }

})


// router.get('/search', function (req, res, next) {
//   res.json({
//     code:200,
//     data:[{id:2,val:2}]
//   },200)
// })


//router.get('/logout', logout.logout)

module.exports = router
