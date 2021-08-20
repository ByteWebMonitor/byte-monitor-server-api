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
    body.time = new Date(body.time)
    await performanceService.create(body)
    // let deviceInfo = JSON.parse(body.deviceInfo)
    ctx.body = {status: 'ok'}
  }

  async getRecentXMinNums(ctx) {
    let body = ctx.request.body
    let nums = await performanceService.getRecentXMinNums(body.xMin);
    ctx.body = { code: 20000, nums: nums }
  }

  async getAllItemList(ctx) {
    let body = ctx.request.body
    let returnInfo = await performanceService.getAllItemList(body.skip, body.limit);
    returnInfo.code = 20000
    ctx.body = returnInfo
  }

}

// 导出 Controller 的实例
module.exports = new PerformanceController();
