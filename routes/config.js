/**
 * Created by Wine on 2017/3/27.
 */
var express = require('express');
var router = express.Router();

//var logout = require('./logout')


router.get('/:configType', function (req, res, next) {
  //console.log(req.session.userInfo)
  if (req.session.userInfo){
    res.render('config', {
      name: 'config',
      userName:req.session.userInfo.userName,
      classificationCount:req.session.userInfo.classificationCount,
      configType: req.params.configType
    })
  } else {
    res.json(200,{msg:'去登陆'})
  }
})


//router.get('/logout', logout.logout)

module.exports = router

