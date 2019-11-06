layui.define(['jquery','layer'], function (exports) {
  'use strict'
  let $ = layui.jquery,
    c = layui.layer

  // TODO 配置API路径
  let server = axios.create({
    baseURL: 'http://localhost:8080', //请求url
    timeout: 10000 //超时处理
    //withCredentials: false, //是否跨域
  })

  //添加一个请求拦截器
  server.interceptors.request.use(function (config) {
    //在请求发出之前进行一些操作，比如请求头携带内容
    //config.headers['Content-Type'] = 'application/json, text/plain'
    config.headers['token'] = getCookie('token')
    layer.load(2);
    return config
  }, function (error) {
    //Do something with request error
    return error
  })

  //添加一个响应拦截器
  server.interceptors.response.use(function (res) {
    layer.closeAll('loading');
    // 写一下操作，比如token过期处理
    if (res.data.code == 400) {
      layer.msg('暂无权限，请重新登录!')
      //window.location.href = '/login'
      return false
    }else if (res.data.code == 500) {
      layer.msg(res.data.msg)
      //window.location.href = '/login'
      return false
    }
    return res
  }, function (error) {
    console.log(error)
    return error
  })

  function getCookie (cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return ''
  }

  exports('axios', server)
})
