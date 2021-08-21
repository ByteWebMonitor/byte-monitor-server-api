const errorService = require('../services/errorService');
const appService = require('../services/appService');

/**
 * TodoController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */

class ErrorController {


  async create(ctx) {
    let body = ctx.request.body
    // let isAppIdExist = await appService.isAppIdExist(body.app_id)
    let isAppIdExist = await appService.isAppIdExist(body[0].app_id)
    
    // if (isAppIdExist === false || body.app_id === undefined) {
    if (isAppIdExist === false || body[0].app_id === undefined) {
        ctx.body = {code: '20001', msg: 'app_id is not exist'}
    } else {
        for (let item of body) {
            item.time = new Date(item.time)
        }
        await errorService.create(body)
        // let deviceInfo = JSON.parse(body.deviceInfo)
        ctx.body = {code: '20000', msg:'success'}
    }

  }


  async getRecentXMinNums(ctx) {
    let body = ctx.request.body

    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }


    let nums = await errorService.getRecentXMinNums(app_id, body.xMin);
    ctx.body = { code: 20000, nums: nums }
  }

  async getAllItemList(ctx) {
    let body = ctx.request.body

    let app_id = 'unknown'
    if ('app_id' in body) {
      app_id = body.app_id
    }

    let returnInfo = await errorService.getAllItemList(app_id, body.skip, body.limit);
    returnInfo.code = 20000
    ctx.body = returnInfo
  }

  async getRecentList(ctx) {
    let body = ctx.request.body
    await errorService.create(body)
    // let deviceInfo = JSON.parse(body.deviceInfo)
    ctx.body = {status: 'ok'}
  }
}

// 导出 Controller 的实例
module.exports = new ErrorController();
