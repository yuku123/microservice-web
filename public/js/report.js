layui.use(['jquery', 'element', 'autocomplete', 'tablePlug', 'upload','axios'],
  function () {
    let element = layui.element,
      $ = layui.jquery,
      table = layui.table,
      upload = layui.upload,
      axios = layui.axios,
      autocomplete = layui.autocomplete;

    autocomplete.render({
      elem: $('#search')[0],
      url: 'http://localhost:8080/comment/search',
      template_val: '{{d.name}}',
      template_txt: '{{d.name}}',
      onselect: function (resp) {
        console.log(resp)
        table.reload('reportResult', {
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
      elem: '#reportResult',
      url: 'http://localhost:8080/report/list',
      //, skin: 'row'
      headers: {token: getCookie('token')},
      request: {
        limitName: 'pageElementCount' //每页数据量的参数名，默认：limit
      },
      where: {
        searchKey: ''
      },
      response: {
        statusName: 'code', //规定数据状态的字段名称，默认：code
        statusCode: 200, //规定成功的状态码，默认：0
        countName: 'totalElement', //规定数据总数的字段名称，默认：count
        dataName: 'content' //规定数据列表的字段名称，默认：data
      },
      even: true,
      cols: [
        [
          {field: 'reportPubl', title: '报告名称'},
          {field: 'reportType', title: '报告类型'},
          {field: 'updateTime', title: '上传时间'},
          {field: 'verifyStatus', title: '状态'},
          {field: 'option', title: '操作', toolbar: '#toolbar', width: 150}
        ]],
      page: {
        layout: ['prev', 'page', 'next', 'limit'],
        limit: 10,
        limits: [10, 20],
        theme: 'piday'
      },
    });


    table.on('tool(reportResult)', function (obj) {
      let data = obj.data
      switch (obj.event) {
        case 'view':
          getUrl(data.reportId);
          break;
        case 'download':
          downloadReport(data.reportId);
          break;
      }
    });

    // 下载
    async function downloadReport (id) {
      let res = await axios.get('/report/download',{
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


    function getUrl() {
      $.ajax({
        url:'http://localhost:8080/report/lookup',
        type:'get',
        success:function (res) {
          //debugger;
          let url = JSON.parse(res).url;
          layer.open({
            type: 1,
            title: '报告页',
            maxmin: true,
            shadeClose: true,
            shade: 0.5,
            area: ['80%', '80%'],
            content: '<embed src="http://localhost:8080'+url+'" type="application/pdf" width="100%" height="100%" style="display: block"/>'
            //content: '<div>aa</div>'
          })
        },
        error: function () {
          layer.msg("请求失败")
        }
      })
    }


  })
