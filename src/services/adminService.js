const adminTable = require('../models/adminTable');

class AdminService {

  async login(adminName, adminPasswd) {
    const admin = await adminTable.where({ admin_name: adminName, admin_passwd: adminPasswd }).count();
    if(!admin) {
      return 'fail';
    }
    return 'success';
  }

  async logout() {

  }

  async isAdminExist(adminName) {
      const count = await adminTable.where({ admin_name: adminName}).count();
      if (count>0) {
        return true
      } else {
        return false
      }
  }

}

// 导出 Service 的实例
module.exports = new AdminService();
