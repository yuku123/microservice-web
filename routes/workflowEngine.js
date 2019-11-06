/**
 * Created by Wine on 2017/3/27.
 */
let express = require('express')
let router = express.Router()
let request = require('request')
// let cookieParser = require('cookie-parser');
// let session = require('express-session');
// let app = express();


router.get('/workflowEngineDataSourceConfiguration', function (req, res, next) {
    res.render('workflowEngineDataSourceConfiguration', {
        name: 'index',
        userName: 'zifang'
    })
})

//在数据源配置列表内的,创建逻辑
router.get('/workflowEngineDataSourceConfiguration/create', function (req, res, next) {
    res.render('workflowEngineDataSourceConfigurationCreate', {
        name: 'index',
        userName: 'zifang'
    })
})



router.get('/workflowEngineConfiguration', function (req, res, next) {
    res.render('workflowEngineConfiguration', {
        name: 'index',
        userName: 'zifang'
    })
})

router.get('/workflowEngineManagement', function (req, res, next) {
    res.render('workflowEngineManagement', {
        name: 'index',
        userName: 'zifang'
    })
})

router.get('/workflowEngineEdit', function (req, res, next) {
    res.render('workflowEngineEdit', {
        name: 'index',
        userName: 'zifang'
    })
})

router.get('/workflowEngineStatus', function (req, res, next) {
    res.render('workflowEngineStatus', {
        name: 'index',
        userName: 'zifang'
    })
})
module.exports = router

