const performanceService = require('../services/performanceService');



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
