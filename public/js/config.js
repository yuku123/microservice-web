layui.use(
  ['jquery', 'autocomplete', 'tablePlug', 'axios', 'layer'],
  function () {
    let $ = layui.jquery,
      table = layui.table,
      axios = layui.axios,
      layer = layui.layer
    let popup
    window.classificationCount = parseInt(
      $('#classificationCount').attr('data-count'))

    // TODO 定义configList
    window.configList = []

    // TODO 初始化数据表格
    table.render({
      elem: '#result'
      , data: []
      , even: true
      , cols: [
        [
          {field: 't', title: 'ID',hide:true}
          , {field: 'category', title: '类别'}
          , {field: 'subdivision', title: '细分'}
          , {field: 'businessMen', title: '友商'}
          , {field: 'option', title: '操作', toolbar: '#toolbar', width: 80}
        ]]
      , page: {
        layout: ['prev', 'page', 'next', 'limit'],
        limit: 10,
        limits: [10, 20],
        theme: 'piday'
      }
    })

    // TODO 绑定添加分类按钮事件
    $('#add').on('click', function (e) {
      if (window.configList && window.configList.length < 3) {
        popup = layer.open({
          type: 2,
          title: false,
          area: ['560px', '72%'], //宽高
          content: '/public/mock/config.html'
        })
      } else {
        layer.msg('最多添加3个分类')
      }
    })

    // TODO 为table重构数据并重渲染table
    window.reconsitutionTable = function () {
      //console.log(window.configList)
      let data = window.configList
      let tableData = data.map(function (item) {
        return {
          category: item.category.title,
          subdivision: item.sub.map(function (e) {
            return e.title
          }).join(','),
          businessMen: item.businessmenList.map(function (e) {
            return e.title
          }).join(','),
          t: item.t
        }
      })
      table.reload('result', {
        data: tableData
        , page: {
          curr: 1 //重新从第 1 页开始
        }
      })
    }

    //TODO 监听工具条删除事件
    table.on('tool(result)', function(obj){
      let data = obj.data;
      if(obj.event === 'del'){
        layer.confirm('真的删除关注么', function(index){
          console.log(data);
          for (let k in window.configList) {
            if (window.configList[k].t == data.t) {
              //delete window.configList[k];
              window.configList.splice(k,1)
            }
          }
          window.reconsitutionTable();
          layer.close(index);
        });
      }
    });

    // TODO 绑定保存配置按钮事件
    $('#saveConfig').on('click', async function (e) {
      let nodeList = window.configList.map(function (item) {
        return {
          category: item.category,
          sub: item.sub,
          businessmenList: item.businessmenList.map(function (e) {
            return e.id
          })
        }
      })
      $.ajax({
        url: 'http://localhost:8080/configuration/receive_configuration',
        type: 'POST',
        contentType: 'application/json',
        headers: {
          token: getCookie('token')
        },
        data: JSON.stringify({
          reportType: $('#configType').attr('data-type'),
          nodeList: nodeList
        }),
        success: function (res) {
          console.log(res)
          if (res.code == 200) {
            _iconLayer({
              type: 1,
              title: false,
              closeBtn: false,
              shade: false,
              customIconId: 1, //1:成功；2:提示
              skin: 'piday-msg',
              time: 3000,
              content: '配置已保存…'
            })
            setTimeout(function () {
              window.location.href = '/'
            }, 3000)
          } else {
            _iconLayer({
              type: 1,
              title: false,
              closeBtn: false,
              shade: false,
              customIconId: 2, //1:成功；2:提示
              skin: 'piday-msg',
              time: 3000,
              content: '配置保存失败，请重试'
            })
          }
        },
        error: function (res) {
          console.log(res)
        }
      })
    })

  })
