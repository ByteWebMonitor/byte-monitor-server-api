const errorService = require('../services/errorService');

/**
 * TodoController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */

class ErrorController {


  async statAll(ctx) {
    // const list = await todoService.listAll();
    // ctx.body = {list};
    ctx.body = {status: 'ok'}
  }
  /**
   * 创建error记录
   * 响应格式
   * {
   *   result: newTodo
   * }
   * @param ctx Koa 的上下文参数
   */
  async create(ctx) {
    let body = ctx.request.body
    await errorService.create(body)
    // let deviceInfo = JSON.parse(body.deviceInfo)
    ctx.body = {status: 'ok'}

  }


  async getRecentXMinNums(ctx) {
    let body = ctx.request.body
    let nums = await errorService.getRecentXMinNums(body.xMin);
    ctx.body = { code: 20000, nums: nums }
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
