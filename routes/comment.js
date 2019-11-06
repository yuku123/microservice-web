/**
 * Created by Wine on 2017/3/27.
 */
var express = require('express');
var router = express.Router();
let axios = require('axios')
//var logout = require('./logout')

router.get('/', function (req, res, next) {
  if (req.session.userInfo){
    res.render('commentList', {
      name: 'commentList',
      userName:req.session.userInfo.userName
    })
  } else {
    res.json(200,{msg:'去登陆'})
  }

})


router.get('/:reportId', function (req, res, next) {
  if (req.session.userInfo){
    getReportInfo (req,res)
  } else {
    res.json(200,{msg:'去登陆'})
  }

  function getReportInfo (req,res) {
    axios.get('http://localhost:11001/public/mock/mockText.json', {
      params: {
        reportId:req.params.reportId
      }
    })
    .then(function (response) {
      res.render('comment', {
        name: 'comment',
        userName:req.session.userInfo.userName,
        reportId:req.params.reportId,
        data: response.data
      })
    })
    .catch(function (error) {
      res.json(200,{msg:'报表获取异常!'})
    });
  }

})




//router.get('/logout', logout.logout)

module.exports = router

