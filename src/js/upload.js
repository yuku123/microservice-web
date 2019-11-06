var fs = require('fs');
var formidable = require('formidable');

exports.upload = function(req, res, next){
  var form = new formidable.IncomingForm();
  form.uploadDir = './public/upload';  //文件上传 临时文件存放路径
  form.keepExtensions = true;             //保留后缀格式
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.json({success:false});
    }
    for (var i in files) {
      var target_path = './public/upload/' + files[i].name;  //这里重名时  一定要注意
      //使用同步方式重命名一个文件
      fs.renameSync(files[i].path, target_path);
    }
    files.success = true;

    res.json(200, files);
  });
}
