const deviceService = require('../services/deviceService');


class DeviceController {

  async create(ctx) {
    let body = ctx.request.body
    body.time = new Date(body.time)

    await deviceService.create(body)
    ctx.body = {status: 'ok'}
  }

  async getRecentXMinNums(ctx) {
    let body = ctx.request.body
    let nums = await deviceService.getRecentXMinNums(body.xMin);
    ctx.body = { code: 20000, nums: nums }
  }

  async getAllItemList(ctx) {
    let body = ctx.request.body
    let returnInfo = await deviceService.getAllItemList(body.skip, body.limit);
    returnInfo.code = 20000
    ctx.body = returnInfo
  }

}

// 导出 Controller 的实例
module.exports = new DeviceController();
