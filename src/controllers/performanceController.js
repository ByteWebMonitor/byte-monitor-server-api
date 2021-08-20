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

    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }

    let nums = await performanceService.getRecentXMinNums(app_id, body.xMin);
    ctx.body = { code: 20000, nums: nums }
  }

  async getAllItemList(ctx) {
    let body = ctx.request.body

    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }

    let returnInfo = await performanceService.getAllItemList(app_id, body.skip, body.limit);
    returnInfo.code = 20000
    ctx.body = returnInfo
  }

}

// 导出 Controller 的实例
module.exports = new PerformanceController();
