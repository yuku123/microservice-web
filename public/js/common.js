// TODO layui Config
layui.config({
  base: '/public/assets/plugin/'
}).extend({ //设定模块别名
  autocomplete: 'autocompleter/autocomplete',
  tablePlug: 'tablePlug/tablePlug',
  axios: 'axios/axios',
  dtree: 'dtree/dtree'
})

// TODO date format
Date.prototype.Format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,
    (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1,
      (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(
        ('' + o[k]).length)))
  return fmt
}
//TODO 获取TOKEN
function getCookie (cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
  }
  return ''
}

// TODO 封装自定义ICON函数
function _iconLayer(options) {
  if (options.customIconId === 1) {
    options.content = '<svg class="icon piday-icon" aria-hidden="true"><use xlink:href="#icon-chenggong"></use></svg>' + options.content;
  } else if (options.customIconId === 2) {
    options.content = '<svg class="icon piday-icon" aria-hidden="true"><use xlink:href="#icon-tixing"></use></svg>' + options.content;
  }
  return layer.open(options);
}



//TODO 获取url参数 返回Obj

function getUrlVars () {
  let lets = {}, hash
  let hashes = window.location.href.slice(
    window.location.href.indexOf('?') + 1).split('&')
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=')
    lets[hash[0]] = hash[1]
  }
  return lets
}

layui.use(['jquery', 'element'], function () {
  let element = layui.element,
    $ = layui.jquery
  let route = window.location.pathname

  // ------------------------ TODO 导航栏高亮
  window.onload = function () {
    $('.layui-side .layui-nav-item a').each(function (i, e) {
      if ($(e).attr('href') === route) {
        $(this).parents('.layui-nav-item').addClass('layui-this')
      }
    })
  }


})
