layui.use(
  ['jquery', 'autocomplete', 'axios', 'dtree', 'layer', 'laytpl'],
  function () {
    let $ = layui.jquery,
      axios = layui.axios,
      autocomplete = layui.autocomplete,
      dtree = layui.dtree,
      layer = layui.layer,
      laytpl = layui.laytpl

    const classificationCount = parent.classificationCount;
    let popup = parent.layer.getFrameIndex(window.name) //先得到当前iframe层的索引


    // 定义配置对象
    let configObj = {}
    let businessList = []

    dtree.render({
      elem: '#dataTree',
      url: 'http://localhost:8080/configuration/default_tree',
      method: 'GET',
      headers: {
        token: getCookie('token')
      },
      skin: 'laySimple',
      initLevel: 1,
      height: '205',
      scroll: '#treeBox',
      dataFormat: 'list',  //配置data的风格为list
      checkbarData: 'choose',
      checkbarType: 'only',
      checkbar: true,
      accordion: true,
      menubar: true,
      menubarTips: {
        group: [] // 按钮组制空
      }
    })

    // TODO 绑定分类选择事件
    $('#saveCategory').on('click', function (e) {
      $('#categoryError').hide()
      let params = dtree.getCheckbarNodesParam('dataTree')
      //console.log(params)
      if (params.length > 0) {
        configObj.category = {
          title: params[0].context,
          id: params[0].nodeId
        }
        let id = params.map(function (item) {
          return item.nodeId
        }).join(',')
        getSubdivision(id)
      } else {
        $('#categoryError').show()
      }
    })

    //TODO 获取细分
    async function getSubdivision (id) {
      let res = await axios.get('/configuration/sub_tree', {
        params: {
          id: id
        }
      })
      $('#subDataTree').attr('data-id', id)
      renderSubdivision(res)
    }

    //TODO 渲染细分
    function renderSubdivision (res) {
      //console.log(res)
      let checkedLength = 0
      let subDataTree = dtree.render({
        elem: '#subDataTree',
        data: res.data.data,
        skin: 'laySimple',
        initLevel: 1,
        height: '200',
        scroll: '#subTreeBox',
        dataFormat: 'list',  //配置data的风格为list
        checkbarData: 'choose',
        checkbarType: 'all',
        checkbar: true,
        accordion: true,
        menubar: true,
        menubarTips: {
          group: [] // 按钮组制空
        },
        done: function () {
          $('.select-subdivision').show()
          $('.select-business').show()
          bindAutocomplete()
          $('.save-btn-box').show()
        },
        checkbarFun: {
          chooseBefore: function ($i, node) {
            if (node.checked == '0' && checkedLength >= classificationCount) {
              layer.msg('最多选择' + classificationCount + '个')
              return false
            } else {
              return true
            }
          }
        }
      })

      dtree.on('chooseDone(\'subDataTree\')', function (obj) {
        //console.log(obj.checkbarParams) // 选中的所有复选框的参数
        checkedLength = obj.checkbarParams.length
      })

    }

    // TODO 绑定自动填充事件
    function bindAutocomplete () {
      autocomplete.render({
        elem: $('#search')[0],
        url: 'http://localhost:8080/configuration/businessmen_list',
        request: {
          keywords: 'searchKey'
        },
        response: {
          code: 'code',
          data: 'mapList'
        },
        template_val: '{{d.publiCompName}}',
        template_txt: '{{d.publiCompName}}',
        onselect: function (resp) {
          //console.log(resp)
          businessList.push({
            title:resp.publiCompName,
            id: resp.publiCompId
          })
          renderTpl('selectTpl', 'searchSelect', resp)
        }
      })
    }

    // TODO 模板渲染方法
    function renderTpl (tpl, dom, data) {
      let getTpl = $('#' + tpl).html(),
        view = $('#' + dom)
      laytpl(getTpl).render(data, function (html) {
        view.append(html)
      })
    }

    // TODO 绑定删除按钮事件
    $(document).on('click', '.piday-delete', function (e) {
      $(this).parents('.piday-selected-item').remove()
      let val = $(this).parents('.piday-selected-item').attr('data-id')
      // 移除列表中的对应元素
      businessList.splice(businessList.findIndex(item => item.id == val), 1)
    })

    // TODO 绑定确认按钮事件
    $('#saveAll').on('click', function () {
      let subdivision = dtree.getCheckbarNodesParam('subDataTree')
      configObj.sub = subdivision.map(function (item) {
        return {
          title:item.context,
          id: item.nodeId
        }
      })
      configObj.businessmenList = businessList;
      configObj.t = new Date().getTime();
      parent.configList.push(configObj)
      //console.log(configObj)
      parent.reconsitutionTable();
      parent.layer.close(popup);
    })


  })
