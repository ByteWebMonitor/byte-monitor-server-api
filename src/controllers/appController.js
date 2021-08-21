const appService = require('../services/appService');
const adminService = require('../services/adminService');


class AppController {

  async adminAddAppId(ctx) {
    let body = ctx.request.body
    let admin_name = body.admin_name
    let app_id = body.app_id
    let app_name = body.app_name
    let app_desc = body.app_desc

    let isAdminExist = await adminService.isAdminExist(admin_name);

    if (isAdminExist === false) {
      ctx.body = {
        code: 20001,
        msg: 'admin不存在'
      }
    } else {
        let returnInfo = await appService.adminAddAppId(admin_name, app_id, app_name, app_desc);
        ctx.body = returnInfo
    }
  }
  async getAdminAppIdList(ctx) {
    let body = ctx.request.body
    let returnInfo = await appService.getAdminAppIdList(body.admin_name);
    returnInfo.code = 20000
    ctx.body = returnInfo
  }
}

// 导出 Controller 的实例
module.exports = new AppController();
