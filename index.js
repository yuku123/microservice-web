/**
 * Created by Wine on 2017/3/27.
 */
const path = require('path')
const express = require('express')
const app = express()
// let cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require('express-session')
const http = require('http');
const open = require('open');

// 配置session
app.use(session({
  //默认的name是：connect.sid
  secret: 'report',
  cookie: ('name', 'value', {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 60 * 1000 * 60 * 2 * 1000
  }),
  //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
  resave: true,
  //强制“未初始化”的会话保存到存储。
  saveUninitialized: true
}))

//todo router
//功能路由
app.use('/', require('./routes/index'));
//app.use('/index', require('./routes/index'));
app.use('/configList', require('./routes/configList'));
app.use('/config', require('./routes/config'));
app.use('/comment', require('./routes/comment'));
app.use('/review', require('./routes/review'));
app.use('/report', require('./routes/report'));

//workflow的操作引擎
app.use('/workflowEngine',require('./routes/workflowEngine'))

app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录
app.set('views', path.join(__dirname, 'views/workflow'))// 设置存放模板文件的目录

app.set('view engine', 'ejs')// 设置模板引擎为 ejs

//静态资源请求库
app.use(express.static(__dirname + '/'))
app.use('/public', express.static(__dirname + '/public'))

//错误处理
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

http.createServer(app).listen(11001);
// (async () => {
//   // Opens the URL in the default browser
//   await open('http://localhost:10001');
// })();

