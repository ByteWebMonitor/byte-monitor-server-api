const Router = require('@koa/router');
// Koa 的路由在被 use 时是无法指定前缀的, 需要在定义时就指定前缀
const router = Router({
  prefix: '/api/device'
});

const deviceController = require('../controllers/deviceController');

// 组装路由
router.post('/upload', deviceController.create);
router.post('/getRecentXMinNums', deviceController.getRecentXMinNums);
router.post('/getAllItemList', deviceController.getAllItemList);
router.post('/statXMinRecentPvBrowserRatio', deviceController.statXMinRecentPvBrowserRatio);
router.post('/statXMinRecentPvOsRatio', deviceController.statXMinRecentPvOsRatio);
router.post('/statXDayPerDayPv', deviceController.statXDayPerDayPv);
router.post('/statXHourPerHourPv', deviceController.statXHourPerHourPv);


// Koa 的路由需要调用 routes 函数获取实际用于 use 的函数
module.exports = router.routes();
