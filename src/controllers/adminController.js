const adminService = require('../services/adminService');

class AdminController {

  async login(ctx) {
    ctx.session.logged = false;
    let body = ctx.request.body;
    const message = await adminService.login(body.adminName, body.adminPasswd);
    if(message === 'fail') {
      ctx.body = {
        code: 400,
        message: 'name or password is wrong'
      };
    } else {
      ctx.session.logged = true;
      ctx.body = {
        code: 200,
        message: 'success'
      };
    }
  }

  async logout(ctx) {
  }
}

// 导出 Controller 的实例
module.exports = new AdminController();
