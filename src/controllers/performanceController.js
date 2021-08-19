const performanceService = require('../services/performanceService');

/**
 * TodoController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */

class PerformanceController {

  async statAll(ctx) {
    // const list = await todoService.listAll();
    // ctx.body = {list};
    ctx.body = {status: 'ok'}
  }

  async create(ctx) {
    let body = ctx.request.body
    await performanceService.create(body)
    // let deviceInfo = JSON.parse(body.deviceInfo)
    ctx.body = {status: 'ok'}
  }

}

// 导出 Controller 的实例
module.exports = new PerformanceController();
