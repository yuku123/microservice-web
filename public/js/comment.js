layui.use(['jquery', 'element','table','laytpl'],
  function () {
    let element = layui.element,
      $ = layui.jquery,
      laytpl = layui.laytpl,
      table = layui.table;

    // TODO 模板渲染方法
    function renderTpl(tpl, dom, data) {
      let getTpl = $('#' + tpl).html(),
        view = $('#' + dom);
      laytpl(getTpl).render(data, function (html) {
        view.html(html);
      });
    }

    // $.ajax({
    //   url: '/public/mock/mock.json',
    //   type: 'get',
    //   data: {
    //     reportId:'20190101-20190630-1000000361'
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     //renderTpl('titleTpl', 'title', res)
    //   },
    //   error: function (res) {
    //     console.log(res)
    //   }
    // })



  })
