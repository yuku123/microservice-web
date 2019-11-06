layui.use(['jquery', 'element', 'autocomplete', 'tablePlug', 'upload','axios'],
  function () {
    let element = layui.element,
      $ = layui.jquery,
      table = layui.table,
      upload = layui.upload,
      axios = layui.axios,
      autocomplete = layui.autocomplete

    autocomplete.render({
      elem: $('#search')[0],
      url: 'http://localhost:8080/comment/search',
      template_val: '{{d.name}}',
      template_txt: '{{d.name}}',
      onselect: function (resp) {
        console.log(resp)
        table.reload('result', {
          where: {
            searchKey: resp.name
          }
          , page: {
            curr: 1
          }
        })
      }
    })

    table.render({
      elem: '#result'
      , url: 'http://localhost:8080/comment/list'
      //, skin: 'row'
      , headers: {token: getCookie('token')}
      , request: {
        limitName: 'pageElementCount' //每页数据量的参数名，默认：limit
      }
      , where: {
        searchKey: ''
      }
      , response: {
        statusName: 'code' //规定数据状态的字段名称，默认：code
        , statusCode: 200 //规定成功的状态码，默认：0
        , countName: 'totalElement' //规定数据总数的字段名称，默认：count
        , dataName: 'content' //规定数据列表的字段名称，默认：data
      }
      , even: true
      , cols: [
        [
          {field: 'reportPubl', title: '报告名称'}
          , {field: 'reportType', title: '报告类型'}
          , {field: 'reportUploadTime', title: '生成时间'}
          , {field: 'commentStatus', title: '状态'}
          , {field: 'option', title: '操作', toolbar: '#toolbar', width: 240}
        ]]
      , page: {
        layout: ['prev', 'page', 'next', 'limit'],
        limit: 10,
        limits: [10, 20],
        theme: 'piday'
      }
      , done: function (res, curr, count) {
        //let tableId = this.id;
        let tableElem = this.elem
        // table render出来实际显示的table组件
        let tableViewElem = tableElem.next()
        for(let k in res.content){
          upload.render({
            elem: tableViewElem.find('.upload_btn_' + res.content[k].reportId),
            url: 'http://localhost:8080/comment/upload'
            , data:{
              reportId: res.content[k].reportId
            }
            , field:'fileName'
            //, auto: false
            , accept: 'file'
            , before: function (obj) {
              //console.log(obj)
              layer.load();
            }
            , done: function (res) {
              layer.closeAll('loading');
              //上传完毕回调
            }
            , error: function () {
              layer.closeAll('loading');
              //请求异常回调
            }
          })
        }

      }
    })

    //监听行工具事件
    table.on('tool(result)', function (obj) {
      let data = obj.data;
      console.log(data)
      switch (obj.event) {
        case 'download':
          downloadReport (data.reportId)
          break;
        case 'submission':
          layer.confirm('确认提交审核？', {
            btn: ['确认','取消']
          }, function(){
            layer.close(layer.index);
            postReport(data.reportId,obj)
          }, function(){

          });
          break
      }
    })

    //TODO 提交点评
    async function postReport (id,obj) {
      let params = new URLSearchParams();
      params.append('reportId', id);
      let res = await axios.post('/comment/submit',params);
      // table 缓存移除已提交的报表
      if (res.data.code == 200){
        obj.del();
      }
    }

    //TODO 下载携带token 返还blob对象

    async function downloadReport (id) {
      let res = await axios.get('/comment/download',{
        timeout: 1000000,//超时处理
        params: {
          reportId: id
        },
        responseType:'blob'
      });
      blobToFile (res)
    }

    //TODO blob对象转文件
    function blobToFile (res) {
      console.log(res)
      const blob = new Blob([res.data]);
      const downloadElement = document.createElement("a");
      const href = window.URL.createObjectURL(blob);
      //获取文件名
      const fileName = res.headers['content-disposition'].split(';')[1].split('=')[1];
      downloadElement.href = href;
      downloadElement.download = fileName;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
    }

  })
