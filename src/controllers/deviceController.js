const deviceService = require('../services/deviceService');
const appService = require('../services/appService');


class DeviceController {

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

  async create(ctx) {
    let body = ctx.request.body
    // body.time = new Date(body.time)

    let isAppIdExist = await appService.isAppIdExist(body.app_id)
    if (isAppIdExist === false || body.app_id === undefined) {
        ctx.body = {code: '20001', msg: 'app_id is not exist'}
    } else {
      body.ip = ctx.request.ip
      body.time = new Date(body.time)

      await deviceService.create(body)
      ctx.body = {code: '20000', msg:'success'}
    }


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

  async statXMinRecentPvBrowserRatio(ctx) {
    let body = ctx.request.body

    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }

    let retunInfo = await deviceService.statXMinRecentPvBrowserRatio(app_id, body.xMin);
    retunInfo.code = 20000
    ctx.body = retunInfo

  }

  async statXMinRecentPvOsRatio(ctx) {
    let body = ctx.request.body

    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }
    let retunInfo = await deviceService.statXMinRecentPvOsRatio(app_id, body.xMin);
    retunInfo.code = 20000
    ctx.body = retunInfo
  }

  async statXDayPerDayPv(ctx) {
    let body = ctx.request.body

    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }
    let retunInfo = await deviceService.statXDayPerDayPv(app_id, body.xDay);
    ctx.body = retunInfo
  }

  async statXHourPerHourPv(ctx) {
    let body = ctx.request.body

    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }
    let retunInfo = await deviceService.statXHourPerHourPv(app_id, body.xHour);
    ctx.body = retunInfo
  }



}

// 导出 Controller 的实例
module.exports = new DeviceController();
