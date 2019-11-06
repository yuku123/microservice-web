/**
 * Created by Wine on 2017/3/27.
 */
let express = require('express')
let router = express.Router()
let request = require('request')
// let cookieParser = require('cookie-parser');
// let session = require('express-session');
// let app = express();

router.get('/', function (req, res, next) {
  res.render('index', {
    name: 'index',
    userName: 'zifang'
  })
  //
  // let token = req.query.sid
  //
  // if (token) {
  //   req.session.token = token
  //   res.cookie('token', req.session.token, {
  //       maxAge: 60 * 1000 * 60 * 2 * 1000,
  //       httpOnly: false
  //     })
  //   getUserInfo(req)
  // } else {
  //   if (req.session.token) {
  //     res.render('index', {
  //       name: 'index',
  //       userName: req.session.userInfo.userName
  //     })
  //   } else {
  //     res.json(200, {msg: '去登陆'})
  //   }
  // }
  //
  // function getUserInfo (req) {
  //   let method = req.method.toUpperCase()
  //   let proxy_url = 'http://localhost:8080/configuration/basic_message'
  //   let options = {
  //     headers: {'token': req.session.token},
  //     url: proxy_url,
  //     method: method,
  //     json: true,
  //     body: req.body
  //   }
  //
  //   function callback (error, response, data) {
  //     //console.log(data)
  //     if (data && data.code == 200) {
  //       req.session.userInfo = data
  //       res.render('index', {
  //         name: 'index',
  //         userName: req.session.userInfo.userName
  //       })
  //     } else if(!data){
  //       res.json(200, {msg: '服务异常'})
  //       //console.log('服务异常')
  //     } else {
  //       res.json(200, data)
  //       console.log('token:' + data.msg)
  //     }
  //   }
  //
  //   request(options, callback)
  // }

})

//router.get('/logout', logout.logout)

module.exports = router

