//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
  less = require('gulp-less'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  webpack = require('gulp-webpack'),
  babel = require('gulp-babel'),
  autoprefixer = require('gulp-autoprefixer')

// todo less编译 & 浏览器前缀自动补全
gulp.task('Less', function () {
  gulp.src('src/less/*.less') //该任务针对的文件
    .pipe(less()) //该任务调用的模块
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: true, //是否美化属性值(对齐) 默认：true
    }))
    .pipe(gulp.dest('./public/css')) //将会在src/css下生成index.css
})

// js压缩 （'gulp-uglify'对es6的无法识别。）
// gulp.task('jsmin', function () {
//   //压缩src/js目录下的所有js文件
//   //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
//   gulp.src(['src/js/**/*.js', '!src/js/**/{test1,test2}.js'])
//   .pipe(babel({
//     presets: ['es2015']
//   }))
//   .pipe(uglify({
//     //mangle: true,//类型：Boolean 默认：true 是否修改变量名
//     mangle: {except: ['require', 'exports', 'module', '$']}//排除混淆关键字
//   })).on('error', function (err) {
//     gutil.log(gutil.colors.red('[Error]'), err.toString())
//   }).pipe(gulp.dest('dist/js'))
// })

// todo es6编译

gulp.task("es6", function () {
  return gulp.src('src/js/*.js')// ES6 源码存放的路径
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js')); //转换成 ES5 存放的路径
});

// todo 监听
gulp.task('watch', function () {
  gulp.watch('./src/less/**/*.less', ['Less'])
  //gulp.watch('./src/js/**/*.js', ['jsmin'])
  gulp.watch('./src/js/**/*.js', ['es6']);
})

// gulp.task('script:public', function() {
//     browserify('src/js/echarts.js')
//       .transform(babelify, {
//           presets: ['es2015', 'react']
//       })
//       .bundle()
//       .pipe(source('echarts.js'))
//       .pipe(gulp.dest('./public/js'));
// });

gulp.task('default', ['Less', 'es6', 'watch']) //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径
