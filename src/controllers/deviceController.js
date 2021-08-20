const deviceService = require('../services/deviceService');


class DeviceController {

  async create(ctx) {
    let body = ctx.request.body
    // body.time = new Date(body.time)
    body.ip = ctx.request.ip
    body.time = new Date(body.time)

    await deviceService.create(body)
    ctx.body = {status: 'ok'}
  }

  async getRecentXMinNums(ctx) {
    let body = ctx.request.body

    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }

    let nums = await deviceService.getRecentXMinNums(app_id, body.xMin);
    ctx.body = { code: 20000, nums: nums }
  }

  async getAllItemList(ctx) {
    let body = ctx.request.body
    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }
    let returnInfo = await deviceService.getAllItemList(app_id, body.skip, body.limit);
    returnInfo.code = 20000
    ctx.body = returnInfo
  }
}

// 导出 Controller 的实例
module.exports = new DeviceController();
